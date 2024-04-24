import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";

import { SearchInput } from "./SearchInput";

function StatefulParent() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  function handleChange(newSearchQuery: string) {
    setSearchQuery(newSearchQuery);
  }

  return <SearchInput value={searchQuery} onChange={handleChange} />;
}

function renderComponent() {
  vi.clearAllMocks();
  render(<StatefulParent />);
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
