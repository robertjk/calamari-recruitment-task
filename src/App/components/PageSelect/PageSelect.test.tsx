import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";

import { type Page, PageSelect } from "./PageSelect";
import { PAGE_TITLES } from "./pageTitles";

const onChangeMock = vi.fn();

function StatefulParent() {
  const [page, setPage] = useState<Page>("all");

  onChangeMock.mockImplementation((newPage: Page) => {
    setPage(newPage);
  });

  return <PageSelect value={page} onChange={onChangeMock} />;
}

test("Properly handles clicking on inputs and labels", async () => {
  const user = userEvent.setup();

  render(<StatefulParent />);
  expect(onChangeMock).toHaveBeenCalledTimes(0);

  const favoritesInput = screen.getByLabelText(
    new RegExp(PAGE_TITLES.favorites, "i"),
  );
  await user.click(favoritesInput);
  expect(favoritesInput).toBeChecked();
  expect(onChangeMock).toHaveBeenCalledTimes(1);

  const allInput = screen.getByLabelText(new RegExp(PAGE_TITLES.all, "i"));
  await user.click(allInput);
  expect(allInput).toBeChecked();
  expect(onChangeMock).toHaveBeenCalledTimes(2);

  const favoritesLabel = screen.getByText(
    new RegExp(PAGE_TITLES.favorites, "i"),
  );
  await user.click(favoritesLabel);
  expect(favoritesInput).toBeChecked();
  expect(onChangeMock).toHaveBeenCalledTimes(3);

  const allLabel = screen.getByText(new RegExp(PAGE_TITLES.all, "i"));
  await user.click(allLabel);
  expect(allInput).toBeChecked();
  expect(onChangeMock).toHaveBeenCalledTimes(4);

  await user.click(allInput);
  expect(allInput).toBeChecked();
  expect(onChangeMock).toHaveBeenCalledTimes(4);
});
