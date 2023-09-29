import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {},
  reducers: {
    addPage: (state, action) => {
      state[action.payload.page] = action.payload.results;
    },
    removePage: (state, action) => {
      delete state[action.payload];
    },
    reset: () => ({}),
  },
});

export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
