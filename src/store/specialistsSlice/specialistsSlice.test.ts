import { assert, beforeEach, expect, test } from "vitest";

import { type AppStore, makeStore } from "%store";

import {
  addFavoriteSpecialist,
  addSpecialists,
  removeFavoriteSpecialist,
  selectIsSpecialistInFavorites,
  selectPage,
  selectSearchQuery,
  selectSpecialistsAll,
  selectSpecialistsFavorite,
  setPage,
  setSearchQuery,
  specialistsSlice,
  type SpecialistsSliceState,
} from "./specialistsSlice";

const initialState: SpecialistsSliceState = {
  page: "all",
  searchQuery: "",
  specialistsAll: {},
  specialistsFavorite: [],
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
    specialistsAll: {},
    specialistsFavorite: [],
  });
});

test<LocalTestContext>("Properly handles specialists being added", ({
  store,
}) => {
  expect(selectSpecialistsAll(store.getState())).toStrictEqual([]);

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

  expect(selectSpecialistsAll(store.getState())).toStrictEqual([
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

test<LocalTestContext>("Properly adds and removes specialists from favorites", ({
  store,
}) => {
  const specialistToAdd1 = {
    id: 1,
    name: "John",
    surname: "Doe",
    profession: "magician",
    photoUrl: "http://some.server.com/photo.jpg",
    rating: {
      sum: 11,
      count: 3,
    },
  };
  const specialistToAdd2 = {
    id: 2,
    name: "Maria",
    surname: "Jimenez",
    profession: "angel",
    photoUrl: "http://some.other.server.com/photo.jpg",
    rating: {
      sum: 1532,
      count: 438,
    },
  };

  expect(selectSpecialistsFavorite(store.getState())).toStrictEqual([]);

  store.dispatch(addFavoriteSpecialist(specialistToAdd1));
  expect(selectSpecialistsFavorite(store.getState())).toStrictEqual([
    specialistToAdd1,
  ]);
  expect(
    selectIsSpecialistInFavorites(store.getState(), specialistToAdd1),
  ).toBe(true);

  store.dispatch(addFavoriteSpecialist(specialistToAdd2));
  expect(selectSpecialistsFavorite(store.getState())).toStrictEqual([
    specialistToAdd1,
    specialistToAdd2,
  ]);
  expect(
    selectIsSpecialistInFavorites(store.getState(), specialistToAdd1),
  ).toBe(true);
  expect(
    selectIsSpecialistInFavorites(store.getState(), specialistToAdd2),
  ).toBe(true);

  store.dispatch(removeFavoriteSpecialist(specialistToAdd1));
  expect(selectSpecialistsFavorite(store.getState())).toStrictEqual([
    specialistToAdd2,
  ]);
  expect(
    selectIsSpecialistInFavorites(store.getState(), specialistToAdd1),
  ).toBe(false);
  expect(
    selectIsSpecialistInFavorites(store.getState(), specialistToAdd2),
  ).toBe(true);

  store.dispatch(removeFavoriteSpecialist(specialistToAdd2));
  expect(selectSpecialistsFavorite(store.getState())).toStrictEqual([]);
  expect(
    selectIsSpecialistInFavorites(store.getState(), specialistToAdd1),
  ).toBe(false);
  expect(
    selectIsSpecialistInFavorites(store.getState(), specialistToAdd2),
  ).toBe(false);

  assert.throws(
    () => store.dispatch(removeFavoriteSpecialist(specialistToAdd2)),
    /No specialist with ID/,
  );
});
