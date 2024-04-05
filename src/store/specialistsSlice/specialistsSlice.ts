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
  specialists: SpecialistsRecord;
}

const initialState: SpecialistsSliceState = {
  page: "all",
  searchQuery: "",
  specialists: specialists.reduce<SpecialistsRecord>((record, specialist) => {
    record[specialist.id] = specialist;
    return record;
  }, {}),
};

const specialistsSlice = createSlice({
  name: "specialists",
  initialState,
  reducers: {
    addSpecialists(state, action: PayloadAction<Specialist[]>) {
      action.payload.forEach((specialist) => {
        state.specialists[specialist.id] = specialist;
      });
    },
    setPage(state, action: PayloadAction<Page>) {
      state.page = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
  selectors: {
    selectPage: (state) => state.page,
    selectSpecialistAverageRating: (state, id: Specialist["id"]) => {
      const specialist = state.specialists[id];
      return specialist.rating.sum / specialist.rating.count;
    },
    selectSpecialistFullName: (state, id: Specialist["id"]) => {
      const specialist = state.specialists[id];
      return `${specialist.name} ${specialist.surname}`;
    },
    selectSpecialists: createSelector(
      (state: SpecialistsSliceState) => state.specialists,
      (specialists) => Object.values(specialists),
    ),
    selectSearchQuery: (state) => state.searchQuery,
  },
});

const { addSpecialists, setPage, setSearchQuery } = specialistsSlice.actions;

const {
  selectPage,
  selectSpecialistAverageRating,
  selectSpecialistFullName,
  selectSpecialists,
  selectSearchQuery,
} = specialistsSlice.selectors;

export {
  addSpecialists,
  type Page,
  selectPage,
  selectSearchQuery,
  selectSpecialistAverageRating,
  selectSpecialistFullName,
  selectSpecialists,
  setPage,
  setSearchQuery,
  type Specialist,
  specialistsSlice,
  type SpecialistsSliceState,
};
