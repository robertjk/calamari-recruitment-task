import { screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { renderWithStore } from "%store/utils/renderWithStore";

import { SpecialistsList } from "./SpecialistsList";

test("Renders specialists tiles", () => {
  renderWithStore(<SpecialistsList />);

  const specialistNewsom = screen.getByText("Joanna Newsom");
  const specialistMcNulty = screen.getByText("James McNulty");

  expect(specialistNewsom).toBeVisible();
  expect(specialistMcNulty).toBeVisible();
});

test("Renders the text with no specialists", () => {
  renderWithStore(<SpecialistsList />, {
    preloadedState: {
      specialists: {
        page: "all",
        searchQuery: "",
        specialistsAll: {},
        specialistsFavorite: [],
      },
    },
  });

  const text = screen.getByText(/No specialists to show/i);

  expect(text).toBeInTheDocument();
});
