import { screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { renderWithStore } from "%store/utils/renderWithStore";

import { PAGE_TITLES } from "./PageSelect/pageTitles";

import { App } from "./App";

test("Renders properly the default page", () => {
  renderWithStore(<App />);

  const pageTitle = screen.getAllByText(new RegExp(PAGE_TITLES.all, "i"));

  expect(pageTitle[0]).toBeInTheDocument();
});
