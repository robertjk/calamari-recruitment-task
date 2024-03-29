import { render, screen } from "@testing-library/react";

import App from "./App";

test("renders text in the component", () => {
  render(<App />);
  const linkElement = screen.getByText(/Calamari Recruitment Task/i);
  expect(linkElement).toBeInTheDocument();
});
