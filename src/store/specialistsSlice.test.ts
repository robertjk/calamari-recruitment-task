import { beforeEach, expect, test } from "vitest";

import { type AppStore, makeStore } from "%store";

import {
  selectPage,
  selectSearchQuery,
  selectSpecialists,
  setPage,
  setSearchQuery,
  setSpecialists,
  specialistsSlice,
  type SpecialistsSliceState,
} from "./specialistsSlice";

interface LocalTestContext {
  store: AppStore;
}

beforeEach<LocalTestContext>((context) => {
  const initialState: SpecialistsSliceState = {
    page: "all",
    searchQuery: "",
    specialists: [],
  };
  context.store = makeStore({ specialists: initialState });
});

test<LocalTestContext>("Properly initializes the store", () => {
  expect(
    specialistsSlice.reducer(undefined, { type: "unknown" }),
  ).toStrictEqual({
    page: "all",
    searchQuery: "",
    specialists: [],
  });
});

test<LocalTestContext>("Properly handles setPage action", ({ store }) => {
  expect(selectPage(store.getState())).toBe("all");

  store.dispatch(setPage("favorites"));

  expect(selectPage(store.getState())).toBe("favorites");
});

test<LocalTestContext>("Properly handles setSearchQuery action", ({
  store,
}) => {
  expect(selectSearchQuery(store.getState())).toBe("");

  store.dispatch(setSearchQuery("something"));

  expect(selectSearchQuery(store.getState())).toBe("something");
});

test<LocalTestContext>("Properly handles setSpecialists action", ({
  store,
}) => {
  expect(selectSpecialists(store.getState())).toStrictEqual([]);

  store.dispatch(
    setSpecialists([
      {
        name: "John Doe",
        profession: "magician",
        photo: "http://some.server.com/photo.jpg",
        rating: {
          sum: 11,
          count: 3,
        },
      },
    ]),
  );

  expect(selectSpecialists(store.getState())).toStrictEqual([
    {
      name: "John Doe",
      profession: "magician",
      photo: "http://some.server.com/photo.jpg",
      rating: {
        sum: 11,
        count: 3,
      },
    },
  ]);
});
