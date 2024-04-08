import { assert, beforeEach, expect, test } from "vitest";

import { type AppStore, makeStore } from "%store";

import {
  addFavoriteSpecialist,
  addSpecialists,
  removeFavoriteSpecialist,
  selectDisplayedSpecialists,
  selectIsSpecialistInFavorites,
  selectPage,
  selectSearchQuery,
  setPage,
  setSearchQuery,
  specialistsSlice,
  type SpecialistsSliceState,
} from "./specialistsSlice";

const specialist1 = {
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
const specialist2 = {
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
const specialist3 = {
  id: 3,
  name: "Katy",
  surname: "Peers",
  profession: "magician",
  photoUrl: "http://some.server.com/photo.jpg",
  rating: {
    sum: 58,
    count: 17,
  },
};

const initialState: SpecialistsSliceState = {
  page: "all",
  searchQuery: "",
  specialistsAll: {
    1: specialist1,
  },
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
    specialistsAll: {
      1: specialist1,
    },
    specialistsFavorite: [],
  });
});

test<LocalTestContext>("Properly handles specialists being added", ({
  store,
}) => {
  expect(selectDisplayedSpecialists(store.getState())).toStrictEqual([
    specialist1,
  ]);

  store.dispatch(addSpecialists([specialist2, specialist3]));

  expect(selectDisplayedSpecialists(store.getState())).toStrictEqual([
    specialist1,
    specialist2,
    specialist3,
  ]);
});

test<LocalTestContext>("Properly handles page being set", ({ store }) => {
  expect(selectPage(store.getState())).toBe("all");

  expect(selectDisplayedSpecialists(store.getState())).toStrictEqual([
    specialist1,
  ]);

  store.dispatch(setPage("favorites"));
  expect(selectPage(store.getState())).toBe("favorites");
  expect(selectDisplayedSpecialists(store.getState())).toStrictEqual([]);
});

test<LocalTestContext>("Properly handles search query being set", ({
  store,
}) => {
  expect(selectSearchQuery(store.getState())).toBe("");

  store.dispatch(addSpecialists([specialist2, specialist3]));

  store.dispatch(setSearchQuery("magician"));
  expect(selectDisplayedSpecialists(store.getState())).toStrictEqual([
    specialist1,
    specialist3,
  ]);

  store.dispatch(setSearchQuery("ohn doe"));
  expect(selectDisplayedSpecialists(store.getState())).toStrictEqual([
    specialist1,
  ]);

  store.dispatch(setSearchQuery("something"));
  expect(selectDisplayedSpecialists(store.getState())).toStrictEqual([]);
});

test<LocalTestContext>("Properly adds and removes specialists from favorites", ({
  store,
}) => {
  store.dispatch(setPage("favorites"));
  expect(selectDisplayedSpecialists(store.getState())).toStrictEqual([]);

  store.dispatch(addFavoriteSpecialist(specialist2));
  expect(selectDisplayedSpecialists(store.getState())).toStrictEqual([
    specialist2,
  ]);
  expect(selectIsSpecialistInFavorites(store.getState(), specialist2)).toBe(
    true,
  );

  store.dispatch(addFavoriteSpecialist(specialist3));
  expect(selectDisplayedSpecialists(store.getState())).toStrictEqual([
    specialist2,
    specialist3,
  ]);
  expect(selectIsSpecialistInFavorites(store.getState(), specialist2)).toBe(
    true,
  );
  expect(selectIsSpecialistInFavorites(store.getState(), specialist3)).toBe(
    true,
  );

  store.dispatch(removeFavoriteSpecialist(specialist2));
  expect(selectDisplayedSpecialists(store.getState())).toStrictEqual([
    specialist3,
  ]);
  expect(selectIsSpecialistInFavorites(store.getState(), specialist2)).toBe(
    false,
  );
  expect(selectIsSpecialistInFavorites(store.getState(), specialist3)).toBe(
    true,
  );

  store.dispatch(removeFavoriteSpecialist(specialist3));
  expect(selectDisplayedSpecialists(store.getState())).toStrictEqual([]);
  expect(selectIsSpecialistInFavorites(store.getState(), specialist2)).toBe(
    false,
  );
  expect(selectIsSpecialistInFavorites(store.getState(), specialist3)).toBe(
    false,
  );

  assert.throws(
    () => store.dispatch(removeFavoriteSpecialist(specialist3)),
    /No specialist with ID/,
  );
});
