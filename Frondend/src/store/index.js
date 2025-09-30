// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import filteredResultsReducer from './filteredResultsSlice';

const store = configureStore({
  reducer: {
    filteredResults: filteredResultsReducer,
  },
});

export default store;
