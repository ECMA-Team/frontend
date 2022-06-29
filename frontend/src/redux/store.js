import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import cartReducer from "./reducers/cart";
import categoryReducer from "./reducers/categoryAdmin";
import productsReducer from "./reducers/products";

import usersReducer from "./reducers/users";
import searchReducer from "./reducers/sreach";
import brandsReducer from "./reducers/brand"
import cloudinaryReducer from "./reducers/cloudinary"
import orderReducer from "./reducers/order"

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    category: categoryReducer,
    users:usersReducer,
    search:searchReducer,
    brands:brandsReducer,
    cloudinary:cloudinaryReducer,
    order:orderReducer
    
  },
});
