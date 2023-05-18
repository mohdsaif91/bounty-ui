import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const contractSlice = createSlice({
  name: "contract",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const contractReducer = contractSlice.reducer;
