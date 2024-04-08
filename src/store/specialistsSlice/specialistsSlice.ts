import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { Specialist, specialists } from "./specialists";

type Page = "all" | "favorites";

type SpecialistsRecord = Record<Specialist["id"], Specialist>;

interface SpecialistsSliceState {
  page: Page;
  searchQuery: string;
  specialistsAll: SpecialistsRecord;
  specialistsFavorite: Specialist[];
}

const initialState: SpecialistsSliceState = {
  page: "all",
  searchQuery: "",
  specialistsAll: specialists.reduce<SpecialistsRecord>(
    (record, specialist) => {
      record[specialist.id] = specialist;
      return record;
    },
    {},
  ),
  specialistsFavorite: [],
};

const selectPage = (state: SpecialistsSliceState) => state.page;
const selectSpecialistsAll = createSelector(
  (state: SpecialistsSliceState) => state.specialistsAll,
  (specialists) => Object.values(specialists),
);
const selectSpecialistsFavorite = (state: SpecialistsSliceState) =>
  state.specialistsFavorite;

const specialistsSlice = createSlice({
  name: "specialists",
  initialState,
  reducers: {
    addSpecialists(state, action: PayloadAction<Specialist[]>) {
      action.payload.forEach((specialist) => {
        state.specialistsAll[specialist.id] = specialist;
      });
    },
    addFavoriteSpecialist(state, action: PayloadAction<Specialist>) {
      const specialistToAdd = action.payload;
      const alreadyInFavorites = state.specialistsFavorite.some(
        (favoriteSpecialist) => favoriteSpecialist.id === specialistToAdd.id,
      );
      if (!alreadyInFavorites) {
        state.specialistsFavorite.push(specialistToAdd);
      }
    },
    removeFavoriteSpecialist(state, action: PayloadAction<Specialist>) {
      const specialistToRemove = action.payload;
      const indexToRemove = state.specialistsFavorite.findIndex(
        (favoriteSpecialist) => favoriteSpecialist.id === specialistToRemove.id,
      );
      if (indexToRemove === -1) {
        throw new TypeError(
          `No specialist with ID ${specialistToRemove.id.toString()} in favorites`,
        );
      } else {
        state.specialistsFavorite.splice(indexToRemove, 1);
      }
    },
    setPage(state, action: PayloadAction<Page>) {
      state.page = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
  selectors: {
    selectIsSpecialistInFavorites: (state, specialist: Specialist) =>
      state.specialistsFavorite.some(
        (favoriteSpecialist) => favoriteSpecialist.id === specialist.id,
      ),
    selectPage: selectPage,
    selectSpecialistAverageRating: (state, id: Specialist["id"]) => {
      const specialist = state.specialistsAll[id];
      return specialist.rating.sum / specialist.rating.count;
    },
    selectSpecialistFullName: (state, id: Specialist["id"]) => {
      const specialist = state.specialistsAll[id];
      return `${specialist.name} ${specialist.surname}`;
    },
    selectSpecialistsAll: selectSpecialistsAll,
    selectSpecialistsFavorite: selectSpecialistsFavorite,
    selectSpecialistsCurrentPage: createSelector(
      [selectPage, selectSpecialistsAll, selectSpecialistsFavorite],
      (page, specialistsAll, specialistsFavorite) => {
        if (page === "all") {
          return specialistsAll;
        } else {
          return specialistsFavorite;
        }
      },
    ),
    selectSearchQuery: (state) => state.searchQuery,
  },
});

const {
  addSpecialists,
  addFavoriteSpecialist,
  setPage,
  removeFavoriteSpecialist,
  setSearchQuery,
} = specialistsSlice.actions;

const {
  selectIsSpecialistInFavorites,
  selectPage: selectPageExport,
  selectSpecialistAverageRating,
  selectSpecialistFullName,
  selectSpecialistsCurrentPage,
  selectSearchQuery,
} = specialistsSlice.selectors;

export {
  addFavoriteSpecialist,
  addSpecialists,
  type Page,
  removeFavoriteSpecialist,
  selectIsSpecialistInFavorites,
  selectPageExport as selectPage,
  selectSearchQuery,
  selectSpecialistAverageRating,
  selectSpecialistFullName,
  selectSpecialistsCurrentPage,
  setPage,
  setSearchQuery,
  type Specialist,
  specialistsSlice,
  type SpecialistsSliceState,
};
