import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

import { renderWithStore } from "%store/utils/renderWithStore";

import { SearchInput } from "./SearchInput";

function renderComponent() {
  vi.clearAllMocks();
  renderWithStore(<SearchInput />);
}

test("Properly handles input text changes", async () => {
  const user = userEvent.setup();
  renderComponent();
  const input = screen.getByPlaceholderText(/Search/);

  input.focus();
  await user.keyboard("something");
  expect(input).toHaveValue("something");

  await user.clear(input);
  expect(input).toHaveValue("");
});
