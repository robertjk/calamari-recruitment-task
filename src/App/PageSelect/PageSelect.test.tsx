import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";

import { type Page } from "%store/specialistsSlice";

import { PAGE_TITLES } from "./pageTitles";
import { PageSelect } from "./PageSelect";

const handlePageChangeMock = vi.fn();

function StatefulParent() {
  const [page, setPage] = useState<Page>("all");
  handlePageChangeMock.mockImplementation((page: Page) => {
    setPage(page);
  });
  return <PageSelect page={page} onPageChange={handlePageChangeMock} />;
}

function renderComponent() {
  vi.clearAllMocks();
  render(<StatefulParent />);
}

test("Displays both inputs", () => {
  renderComponent();

  const allInput = screen.getByLabelText(new RegExp(PAGE_TITLES.all, "i"));
  const favoritesInput = screen.getByLabelText(
    new RegExp(PAGE_TITLES.favorites, "i"),
  );

  expect(allInput).toBeInTheDocument();
  expect(favoritesInput).toBeInTheDocument();
});

test("Invokes onSelect after clicking inputs and labels", async () => {
  const user = userEvent.setup();

  renderComponent();

  const favoritesInput = screen.getByLabelText(
    new RegExp(PAGE_TITLES.favorites, "i"),
  );
  await user.click(favoritesInput);
  expect(handlePageChangeMock.mock.lastCall).toStrictEqual(["favorites"]);

  const allInput = screen.getByLabelText(new RegExp(PAGE_TITLES.all, "i"));
  await user.click(allInput);
  expect(handlePageChangeMock.mock.lastCall).toStrictEqual(["all"]);

  const favoritesLabel = screen.getByText(
    new RegExp(PAGE_TITLES.favorites, "i"),
  );
  await user.click(favoritesLabel);
  expect(handlePageChangeMock.mock.lastCall).toStrictEqual(["favorites"]);

  const allLabel = screen.getByText(new RegExp(PAGE_TITLES.all, "i"));
  await user.click(allLabel);
  expect(handlePageChangeMock.mock.lastCall).toStrictEqual(["all"]);

  expect(handlePageChangeMock.mock.calls.length).toBe(4);

  await user.click(allLabel);
  expect(handlePageChangeMock.mock.calls.length).toBe(4);
});
