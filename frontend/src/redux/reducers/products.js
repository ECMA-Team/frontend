import { createSlice } from "@reduxjs/toolkit";

export const products = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    // payload : new product
    addProductAction: (state, action) => {
      state.products.push(action.payload);
    },
    // payload : array of products
    setProductsAction: (state, action) => {
      state.products = action.payload;
    },
    //payload :{id:id , newProduct:{title ,description,..}}
    updateProductAction: (state, action) => {
      state.products = state.products.map((e) => {
        if (e.id == action.payload.id) {
          return action.payload.newProduct;
        }
        return e;
      });
    },
    //payload:id
    deleteProductAction: (state, action) => {
      state.products = state.products.filter((e) => {
        return e.id != action.payload;
      });
    },
  },
});
export const {
  addProductAction,
  setProductsAction,
  updateProductAction,
  deleteProductAction,
} = products.actions;

export default products.reducer;
