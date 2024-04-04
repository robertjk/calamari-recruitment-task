import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { Specialist, specialists } from "./specialists";

type Page = "all" | "favorites";

interface SpecialistsSliceState {
  specialists: Specialist[];
  page: Page;
  searchQuery: string;
}

const initialState: SpecialistsSliceState = {
  page: "all",
  searchQuery: "",
  specialists,
};

const specialistsSlice = createSlice({
  name: "specialists",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<Page>) {
      state.page = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSpecialists(state, action: PayloadAction<Specialist[]>) {
      state.specialists = action.payload;
    },
  },
  selectors: {
    selectPage: (state) => state.page,
    selectSpecialists: (state) => state.specialists,
    selectSearchQuery: (state) => state.searchQuery,
  },
});

const { setPage, setSearchQuery, setSpecialists } = specialistsSlice.actions;

const { selectPage, selectSpecialists, selectSearchQuery } =
  specialistsSlice.selectors;

export {
  type Page,
  selectPage,
  selectSearchQuery,
  selectSpecialists,
  setPage,
  setSearchQuery,
  setSpecialists,
  type Specialist,
  specialistsSlice,
  type SpecialistsSliceState,
};
