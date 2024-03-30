import { render, screen } from "@testing-library/react";

import { PAGE_TITLES } from "./page.type";

import { App } from "./App";

test("renders first page by default", () => {
  render(<App />);

  const pageTitle = screen.getAllByText(new RegExp(PAGE_TITLES.all, "i"));

  expect(pageTitle[0]).toBeInTheDocument();
});
