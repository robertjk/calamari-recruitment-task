import { beforeEach, expect, test } from "vitest";

import { type AppStore, makeStore } from "%store";

import {
  addSpecialists,
  selectPage,
  selectSearchQuery,
  selectSpecialists,
  setPage,
  setSearchQuery,
  specialistsSlice,
  type SpecialistsSliceState,
} from "./specialistsSlice";

const initialState: SpecialistsSliceState = {
  page: "all",
  searchQuery: "",
  specialists: {},
};

interface LocalTestContext {
  store: AppStore;
}

beforeEach<LocalTestContext>((context) => {
  context.store = makeStore({ specialists: initialState });
});

test<LocalTestContext>("Properly initializes the store", () => {
  expect(
    specialistsSlice.reducer(initialState, { type: "unknown" }),
  ).toStrictEqual({
    page: "all",
    searchQuery: "",
    specialists: {},
  });
});

test<LocalTestContext>("Properly handles specialists being added", ({
  store,
}) => {
  expect(selectSpecialists(store.getState())).toStrictEqual([]);

  store.dispatch(
    addSpecialists([
      {
        id: 1,
        name: "John",
        surname: "Doe",
        profession: "magician",
        photoUrl: "http://some.server.com/photo.jpg",
        rating: {
          sum: 11,
          count: 3,
        },
      },
    ]),
  );

  expect(selectSpecialists(store.getState())).toStrictEqual([
    {
      id: 1,
      name: "John",
      surname: "Doe",
      profession: "magician",
      photoUrl: "http://some.server.com/photo.jpg",
      rating: {
        sum: 11,
        count: 3,
      },
    },
  ]);
});

test<LocalTestContext>("Properly handles page being set", ({ store }) => {
  expect(selectPage(store.getState())).toBe("all");

  store.dispatch(setPage("favorites"));

  expect(selectPage(store.getState())).toBe("favorites");
});

test<LocalTestContext>("Properly handles search query being set", ({
  store,
}) => {
  expect(selectSearchQuery(store.getState())).toBe("");

  store.dispatch(setSearchQuery("something"));

  expect(selectSearchQuery(store.getState())).toBe("something");
});
