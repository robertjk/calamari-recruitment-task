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
  specialists: [],
  page: "all",
  searchQuery: undefined,
};

const specialistsSlice = createSlice({
  name: "specialists",
  initialState,
  reducers: {
    setSpecialists(state, action: PayloadAction<Specialist[]>) {
      state.specialists = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string | undefined>) {
      state.searchQuery = action.payload;
    },
  },
});

export { specialistsSlice, type Page, type Specialist };
