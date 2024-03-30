import { render, screen } from "@testing-library/react";

import { PAGE_TITLES } from "../page.type";

import { PageSelect } from "./PageSelect";

test("renders both inputs", () => {
  render(<PageSelect />);

  const allInput = screen.getByLabelText(new RegExp(PAGE_TITLES.all, "i"));
  const myInput = screen.getByLabelText(new RegExp(PAGE_TITLES.favorites, "i"));

  expect(allInput).toBeInTheDocument();
  expect(myInput).toBeInTheDocument();
});
