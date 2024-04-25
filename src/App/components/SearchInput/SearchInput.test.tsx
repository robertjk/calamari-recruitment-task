import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { SearchInput } from "./SearchInput";

test("Debouncing of input changes", () => {
  // This test manuall fires events using fireEvent instead of
  // user-event library, as currently user-event doesn't work
  // with Vitest fake timers:
  // https://github.com/testing-library/user-event/issues/1115

  vi.useFakeTimers();

  const handleChangeMock = vi.fn();

  render(<SearchInput onChange={handleChangeMock} />);
  const input = screen.getByPlaceholderText(/Search/);

  // Entering "something"
  fireEvent.change(input, { target: { value: "s" } });
  fireEvent.change(input, { target: { value: "so" } });
  fireEvent.change(input, { target: { value: "som" } });
  fireEvent.change(input, { target: { value: "some" } });
  fireEvent.change(input, { target: { value: "somet" } });
  vi.advanceTimersByTime(400);
  fireEvent.change(input, { target: { value: "someth" } });
  fireEvent.change(input, { target: { value: "somethi" } });
  vi.advanceTimersByTime(300);
  fireEvent.change(input, { target: { value: "somethin" } });
  fireEvent.change(input, { target: { value: "something" } });
  expect(input).toHaveValue("something");
  expect(handleChangeMock).not.toHaveBeenCalled();
  vi.advanceTimersByTime(500);
  expect(handleChangeMock).toHaveBeenCalledTimes(1);
  expect(handleChangeMock).toHaveBeenLastCalledWith("something");

  // Clearing the input
  fireEvent.change(input, { target: { value: "" } });
  expect(input).toHaveValue("");
  expect(handleChangeMock).toHaveBeenCalledTimes(1);
  vi.advanceTimersByTime(500);
  expect(handleChangeMock).toHaveBeenCalledTimes(2);
  expect(handleChangeMock).toHaveBeenLastCalledWith("");
});
