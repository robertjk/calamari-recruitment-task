import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

const createSliceWithAsyncThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export { createSliceWithAsyncThunks };
