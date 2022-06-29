import { createSlice } from "@reduxjs/toolkit";

export const brands = createSlice({
  name: "category",
  initialState: {
    brands: [],
    show:false
  },
  reducers: {
    setShoeAction:(state , action)=>{
      state.show=action.payload
    },
    setBrandsAction: (state, action) => {
      state.brands=action.payload
    },
    // payload :array ofst Brands [Brands]
    getBrandsAction: (state, action) => {
      state.brands = action.payload;
    },
    // payload : Brand object {Brand}
    addToBrandAction: (state, action) => {
      state.brands.push(action.payload);
    },
    // payload: id
    deleteFromBrand: (state, action) => {
      state.brands = state.brands.filter((element) => {
        return element.id != action.payload;
      });
    },
  },
});

export const { getBrandsAction, addToBrandAction, deleteFromBrand,setBrandsAction , setShoeAction } =
  brands.actions;

export default brands.reducer;
