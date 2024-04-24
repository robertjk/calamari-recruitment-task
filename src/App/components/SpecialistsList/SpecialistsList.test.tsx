import { screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { renderWithStore } from "%store/utils/renderWithStore";

import { SpecialistsList } from "./SpecialistsList";

test("Renders proper text when loading", () => {
  renderWithStore(<SpecialistsList isError={false} isLoading />);

  const loadingText = screen.getByText(/Loading/i);

  expect(loadingText).toBeInTheDocument();
});

test("Renders proper text on error", () => {
  const error = new Error("Some error");
  renderWithStore(<SpecialistsList error={error} isError isLoading={false} />);

  const errorText = screen.getByText(/Error/i);

  expect(errorText).toBeInTheDocument();
});
