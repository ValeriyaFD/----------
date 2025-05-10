import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allFilters: true,
  stops: {
    0: true,
    1: true,
    2: true,
    3: true,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleAllFilters: (state) => {
      const newValue = !state.allFilters;
      state.allFilters = newValue;
      state.stops = { 0: newValue, 1: newValue, 2: newValue, 3: newValue };
    },
    toggleStopFilter: (state, action) => {
      const stopKey = action.payload;
      state.stops[stopKey] = !state.stops[stopKey];

      if (state.allFilters && !state.stops[stopKey]) {
        state.allFilters = false;
      }

      const allStopsEnabled = [0, 1, 2, 3].every((key) => state.stops[key]);
      if (allStopsEnabled) {
        state.allFilters = true;
      }
    },
  },
});

export const { toggleAllFilters, toggleStopFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
