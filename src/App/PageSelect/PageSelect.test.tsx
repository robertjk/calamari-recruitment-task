import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

import { renderWithStore } from "%store/utils/renderWithStore";

import { PageSelect } from "./PageSelect";
import { PAGE_TITLES } from "./pageTitles";

function renderComponent() {
  vi.clearAllMocks();
  renderWithStore(<PageSelect />);
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

test("Properly handles clicking on inputs and labels", async () => {
  const user = userEvent.setup();

  renderComponent();

  const favoritesInput = screen.getByLabelText(
    new RegExp(PAGE_TITLES.favorites, "i"),
  );
  await user.click(favoritesInput);
  expect(favoritesInput).toBeChecked();

  const allInput = screen.getByLabelText(new RegExp(PAGE_TITLES.all, "i"));
  await user.click(allInput);
  expect(allInput).toBeChecked();

  const favoritesLabel = screen.getByText(
    new RegExp(PAGE_TITLES.favorites, "i"),
  );
  await user.click(favoritesLabel);
  expect(favoritesInput).toBeChecked();

  const allLabel = screen.getByText(new RegExp(PAGE_TITLES.all, "i"));
  await user.click(allLabel);
  expect(allInput).toBeChecked();

  await user.click(allInput);
  expect(allInput).toBeChecked();
});
