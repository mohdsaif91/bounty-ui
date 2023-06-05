import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiList } from "@/API/apiList";
import { authenticApi } from "@/API/api";

export const getDeveloperData = createAsyncThunk(
  "developer/getDeveloper",
  () => {
    const apiPayload = {
      url: apiList.getDeveloper,
      method: "get",
    };
    return authenticApi(apiPayload);
  }
);

export const addDeveloper: any = createAsyncThunk(
  "developer/addDeveloper",
  (data: any) => {
    const apiPayload = {
      url: apiList.addDeveloper,
      method: "post",
      data,
    };
    return authenticApi(apiPayload);
  }
);

const developerSlice = createSlice({
  name: "developer",
  initialState: {
    developerList: null,
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      getDeveloperData.fulfilled,
      (state: any, { payload }: any) => {
        state.developerList = payload.data;
      }
    );
    builder.addCase(
      getDeveloperData.rejected,
      (state: any, { payload }: any) => {
        state.error = true;
      }
    );
    builder.addCase(addDeveloper.fulfilled, (state: any, { payload }: any) => {
      state.developerList = payload.data;
    });
    builder.addCase(addDeveloper.rejected, (state: any, { payload }: any) => {
      state.error = true;
    });
  },
  reducers: {},
});

export const developerReducer = developerSlice.reducer;
