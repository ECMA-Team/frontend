import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalPrice: 0,
    quantity: 0,
  },
  reducers: {
    setquantityAction: (state, action) => {
      state.quantity = action.payload

    },
    reducequantityAction: (state, action) => {
      state.quantity = state.quantity-1

    },
    iccuresquantityAction: (state, action) => {
      state.quantity = state.quantity+1

    },


    // payload :array of products [products]
    getCartAction: (state, action) => {
      state.cart = action.payload;
    },
    // payload : product object {product}
    addToCartAction: (state, action) => {
      

      state.cart.push(action.payload);
    },
    // payload: id
    deleteFromCartAction: (state, action) => {
      state.cart = state.cart.filter((element) => {
        return element.id != action.payload;
      });
    },

    // payload : none
    emptyCartAction: (state, action) => {
      state.cart = [];
    },
    // payload :totalprice
    setTotalPriceAction: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export const {
  addToCartAction,
  getCartAction,
  emptyCartAction,
  deleteFromCartAction,
  setTotalPriceAction,
  setquantityAction,
  reducequantityAction,
  iccuresquantityAction
} = cart.actions;

export default cart.reducer;
