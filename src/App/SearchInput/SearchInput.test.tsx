import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";

import { SearchInput } from "./SearchInput";

const handleSearchPhraseChangeMock = vi.fn();

function StatefulParent() {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  handleSearchPhraseChangeMock.mockImplementation((newSearchPhrase: string) => {
    setSearchPhrase(newSearchPhrase);
  });

  return (
    <SearchInput
      searchPhrase={searchPhrase}
      onSearchPhraseChange={handleSearchPhraseChangeMock}
    />
  );
}

function renderComponent() {
  vi.clearAllMocks();
  render(<StatefulParent />);
}

test("properly calls onSearchPhraseChange handler", async () => {
  const user = userEvent.setup();
  renderComponent();

  const input = screen.getByPlaceholderText("Search");
  input.focus();
  await user.keyboard("something");

  expect(input).toHaveValue("something");
  expect(handleSearchPhraseChangeMock.mock.lastCall).toStrictEqual([
    "something",
  ]);
});
