import { createSlice } from "@reduxjs/toolkit";

export const cloudinary = createSlice({
  name: "cloudinary",
  initialState: {
    cloudinary: "",
  },
  reducers: {
    // payload :array of category [category]
    getCloudinaryAction: (state, action) => {
      state.cloudinary = action.payload;
    },
    // payload : category object {category}
    addToCloudinaryAction: (state, action) => {
      state.cloudinary=(action.payload);
    },
    
    
  },
});

export const {getCloudinaryAction, addToCloudinaryAction } =
cloudinary.actions;

export default cloudinary.reducer;
