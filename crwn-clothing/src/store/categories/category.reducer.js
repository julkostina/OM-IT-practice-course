import { createSlice } from "@reduxjs/toolkit";
export const CATEGORIES_INITIAL_STATE = {
  categories: [],
};


export const categoriesSLice= createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
})

export const { setCategories } = categoriesSLice.actions;
export const categoriesReducer = categoriesSLice.reducer;
 
