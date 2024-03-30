import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { SearchInput } from "./SearchInput";

test("renders the input", () => {
  render(<SearchInput />);

  const input = screen.getByPlaceholderText("Search");

  expect(input).toBeInTheDocument();
});
