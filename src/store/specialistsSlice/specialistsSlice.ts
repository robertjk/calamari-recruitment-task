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

function selectPage(state: SpecialistsSliceState) {
  return state.page;
}

function selectSearchQuery(state: SpecialistsSliceState) {
  return state.searchQuery;
}

const selectSpecialistsAll = createSelector(
  (state: SpecialistsSliceState) => state.specialistsAll,
  (specialistsAll) => Object.values(specialistsAll),
);

function selectSpecialistsFavorite(state: SpecialistsSliceState) {
  return state.specialistsFavorite;
}

// Defined as a separate function, as I haven't found a way to call
// selectSpecialistFullName inside of createSelector() for
// selectDisplayedSpecialists
function specialistFullName(specialist: Specialist) {
  return `${specialist.name} ${specialist.surname}`;
}

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
    selectPage,
    selectSpecialistAverageRating: (state, id: Specialist["id"]) => {
      const specialist = state.specialistsAll[id];
      return specialist.rating.sum / specialist.rating.count;
    },
    selectSpecialistFullName: (state, id: Specialist["id"]) => {
      const specialist = state.specialistsAll[id];
      return specialistFullName(specialist);
    },
    selectSpecialistsAll,
    selectSpecialistsFavorite,
    selectSearchQuery,
    selectDisplayedSpecialists: createSelector(
      selectPage,
      selectSearchQuery,
      selectSpecialistsAll,
      selectSpecialistsFavorite,
      (
        page,
        searchQuery,
        specialistsAll,
        specialistsFavorite,
      ): Specialist[] => {
        function matchSpecialistToQuery(specialist: Specialist) {
          const queryRegExp = new RegExp(searchQuery, "i");
          return (
            queryRegExp.test(specialistFullName(specialist)) ||
            queryRegExp.test(specialist.profession)
          );
        }

        const specialists =
          page === "all" ? specialistsAll : specialistsFavorite;
        return specialists.filter(matchSpecialistToQuery);
      },
    ),
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
  selectDisplayedSpecialists,
  selectIsSpecialistInFavorites,
  selectPage: selectPageExport,
  selectSearchQuery: selectSearchQueryExport,
  selectSpecialistAverageRating,
  selectSpecialistFullName,
} = specialistsSlice.selectors;

export {
  addFavoriteSpecialist,
  addSpecialists,
  type Page,
  removeFavoriteSpecialist,
  selectDisplayedSpecialists,
  selectIsSpecialistInFavorites,
  selectPageExport as selectPage,
  selectSearchQueryExport as selectSearchQuery,
  selectSpecialistAverageRating,
  selectSpecialistFullName,
  setPage,
  setSearchQuery,
  type Specialist,
  specialistsSlice,
  type SpecialistsSliceState,
};
