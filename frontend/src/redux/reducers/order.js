import { createSlice } from "@reduxjs/toolkit";
export const order = createSlice({
  name: "order",
  initialState: {
    order: [],
    numOfOrder: [],
  },
  reducers: {
    setCompletedOrderAction: (state, action) => {
      state.order = action.payload;
    },

    updateOrderAction: (state, action) => {
      state.order.push(action.payload);
    },
    setNumOfOrderAcion: (state, action) => {
      state.numOfOrder = action.payload;
    },
  },
});

export const {
  updateOrderAction,
  setCompletedOrderAction,
  setNumOfOrderAcion,
} = order.actions;

export default order.reducer;
