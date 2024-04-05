import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

import { IconButton } from "./IconButton";
import styles from "./IconButton.module.css";

test("Visually hides the text", () => {
  render(<IconButton icon="mail">Some text</IconButton>);

  const text = screen.getByText("Some text");
  // Didn't come up with better assertion, as toBeVisible()
  // doesn't work with CSS we use for hiding
  expect(text).toHaveClass(styles.visuallyHiddenText);
});

test("Properly applies title and onClick properties", async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(
    <IconButton icon="mail" title="Some title" onClick={handleClick}>
      Some text
    </IconButton>,
  );

  const button = screen.getByTitle("Some title");
  await user.click(button);
  expect(handleClick).toBeCalledTimes(1);
});
