import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import productReducer from "./productSlice.js";
import cartReducer from "./cartSlice.js";
import orderReducer from "./orderSlice.js";
import venderReducer from "./venderSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    vender: venderReducer,
  },
  devTools: true,
});
export default store;
