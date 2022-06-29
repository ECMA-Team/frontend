import { createSlice } from "@reduxjs/toolkit";

export const category = createSlice({
  name: "category",
  initialState: {
    category: [],
  },
  reducers: {
    // payload :array of category [category]
    getCategoryAction: (state, action) => {
      state.category = action.payload;
    },
    // payload : category object {category}
    addToCategoryAction: (state, action) => {
      state.category.push(action.payload);
    },
    // payload: id
    deleteFromCategory: (state, action) => {
      state.category = state.category.filter((element) => {
        return element.id != action.payload;
      });
    },
  },
});

export const { getCategoryAction, addToCategoryAction, deleteFromCategory } =
  category.actions;

export default category.reducer;
