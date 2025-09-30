// src/store/filteredResultsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filteredResultsSlice = createSlice({
  name: 'filteredResults',
  initialState: [],
  currentpage:1,
  reducers: {
    setFilteredResults: (state, action) => action.payload,
    clearFilteredResults: () => [],
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setItemsPerPage(state, action) {
      state.itemsPerPage = action.payload;
    },
    resetPagination(state) {
      state.currentPage = 1;
      state.itemsPerPage = 6;
    },
  },
});

export const { setFilteredResults, clearFilteredResults ,setCurrentPage,setItemsPerPage,resetPagination } = filteredResultsSlice.actions;

export default filteredResultsSlice.reducer;
