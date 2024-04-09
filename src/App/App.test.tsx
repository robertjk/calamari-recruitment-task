import { screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { renderWithStore } from "%store/utils/renderWithStore";

import { App } from "./App";
import { PAGE_TITLES } from "./components/PageSelect";

test("Renders properly the default page", () => {
  renderWithStore(<App />);

  const pageTitle = screen.getAllByText(new RegExp(PAGE_TITLES.all, "i"));

  expect(pageTitle[0]).toBeInTheDocument();
});
