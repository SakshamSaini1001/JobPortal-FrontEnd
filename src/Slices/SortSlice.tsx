import { createSlice } from "@reduxjs/toolkit";

const SortSlice = createSlice({
  name: "sort",
  initialState: {},
  reducers: {
    updateSort: (state, action) => {
      state = action.payload;
      console.log(state);
      return state;
    },
    resetSort: (state) => {
      state = {};
      return state;
    },
  },
});

export const { updateSort, resetSort } = SortSlice.actions;
export default SortSlice.reducer;
