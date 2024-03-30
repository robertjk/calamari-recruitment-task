import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { SpecialistsList } from "./SpecialistsList";

test("renders the component", () => {
  render(<SpecialistsList />);

  const text = screen.getByText(/No specialists to display/i);

  expect(text).toBeInTheDocument();
});
