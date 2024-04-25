import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

import { renderWithStore } from "%store/utils/renderWithStore";

import { App } from "./App";
import { PAGE_TITLES } from "./components/PageSelect";

function setup() {
  const user = userEvent.setup();

  renderWithStore(<App />);

  return { user };
}

function expectSpecialistsCount(count: number) {
  return waitFor(() => {
    const specialistsOnScreen = screen.getAllByRole("listitem");
    expect(specialistsOnScreen.length).toBe(count);
  });
}

test("Renders properly the default page with all specialists", async () => {
  setup();

  expect(screen.getByText(/Loading/)).toBeInTheDocument();

  const pageTitle = screen.getAllByText(new RegExp(PAGE_TITLES.all, "i"));
  expect(pageTitle[0]).toBeInTheDocument();

  expect(await screen.findByText(/Joanna Newsom/)).toBeInTheDocument();
  expect(await screen.findByText(/Pharoah Sanders/)).toBeInTheDocument();
});

test("Add to favorites functionality", async () => {
  const { user } = setup();

  const specialistsAll = (await screen.findAllByRole("listitem")).map(
    (specialistItem) => {
      return {
        name: within(specialistItem).getByRole("heading", { level: 2 })
          .textContent,
        favoriteButton: within(specialistItem).getByRole("button", {
          name: "Add to favorites",
        }),
      };
    },
  );
  const specialistJoannaNewsom = specialistsAll.find(
    ({ name }) => name === "Joanna Newsom",
  );
  const specialistPharoahSanders = specialistsAll.find(
    ({ name }) => name === "Pharoah Sanders",
  );
  if (!specialistJoannaNewsom || !specialistPharoahSanders) {
    throw new Error("Expected specialist not found");
  }

  const allPageButton = screen.getByRole("radio", {
    name: "All specialists",
  });
  const favoritesPageButton = screen.getByRole("radio", {
    name: "My specialists",
  });

  await user.click(specialistJoannaNewsom.favoriteButton);
  await user.click(specialistPharoahSanders.favoriteButton);

  await user.click(favoritesPageButton);
  await expectSpecialistsCount(2);

  await user.click(specialistJoannaNewsom.favoriteButton);
  await expectSpecialistsCount(1);

  await user.click(allPageButton);
  await expectSpecialistsCount(5);
});

test("Search functionality", async () => {
  const { user } = setup();

  await expectSpecialistsCount(5);

  const searchInput = screen.getByRole("searchbox");
  searchInput.focus();
  await user.keyboard("Joanna Newsom");
  await expectSpecialistsCount(1);
  expect(
    screen.getByRole("heading", { name: "Joanna Newsom" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Pharoah Sanders" }),
  ).not.toBeInTheDocument();

  await user.clear(searchInput);
  await expectSpecialistsCount(5);

  await user.keyboard("musi");
  await expectSpecialistsCount(3);
  expect(
    screen.getByRole("heading", { name: "Kate Bush" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Pharoah Sanders" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Joanna Newsom" }),
  ).toBeInTheDocument();
});
