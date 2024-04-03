import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Specialist {
  name: string;
  profession: string;
  photo?: string;
  rating: {
    sum: number;
    count: number;
  };
}

type Page = "all" | "favorites";

interface SpecialistsSliceState {
  specialists: Specialist[];
  page: Page;
  searchQuery: string | undefined;
}

const initialState: SpecialistsSliceState = {
  page: "all",
  searchQuery: undefined,
  specialists: [],
};

const specialistsSlice = createSlice({
  name: "specialists",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<Page>) {
      state.page = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string | undefined>) {
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
  type Specialist,
  specialistsSlice,
  setPage,
  setSearchQuery,
  setSpecialists,
  selectPage,
  selectSpecialists,
  selectSearchQuery,
};
