import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const initialState = {
  cart: [],
};
export const createcart = createAsyncThunk("cart/create", async (id) => {
  try {
   const res= axios.post(`http://localhost:4000/cart/create/${id}`,{},{
    withCredentials: true,
   })
    await toast.promise(res, {
      loading: "...loading",
      success: (data) => {
        return data?.data?.message || "cart added successfully";
      },
      error: "failed to add ",
    });
    toast.success("yes cart")
    return res.data;
  } catch (error) {
    toast.error(error?.message || "failed to add cart");
  }
});
export const clearcart = createAsyncThunk("clear/cart", async () => {
  try {
    const res = axios.delete(`http://localhost:4000/cart/clear`,{
      withCredentials:true
    });
    await toast.promise(res, {
      loading: "...loading",
      success: (data) => {
        return data?.data?.message || "cart cleared";
      },
      error: "failed to clear ",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.message || "failed to clear cart");
  }
});
export const getcart = createAsyncThunk("get/cart", async (id) => {
  try {
    const res = axios.get(`http://localhost:4000/cart/getproducts`,{
      withCredentials:true
    });
    await toast.promise(res, {
      loading: "...loading",
      success: (data) => {
        return data?.data?.message || "fetched successfully";
      },
      error: "failed to fetch data",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.message);
  }
});
export const removefromcart = createAsyncThunk("cart/remove", async (id) => {
  try {
    const res = axios.delete(
      `http://localhost:4000/cart/remove/${id}`,{
        withCredentials:true
      }
    );
    await toast.promise(res, {
      loading: "...loading",
      success: (data) => {
        return data?.data?.mssage || "removedsuccessfully";
      },
      error: "failed to remove product",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.message);
  }
});
export const updatecart = createAsyncThunk("cart/update", async (id) => {
  try {
    const res = axios.put(
      `http://localhost:4000/cart/update/65c7c670400dcff7e9890f5d`
    );
    await toast.promise(res, {
      loading: "...loading",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to update ",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.message);
  }
});
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getcart.fulfilled,(state,action)=>{
      state.cart=action?.payload?.cart?.products
    })
  },
});
export const {} = cartSlice.actions;
export default cartSlice.reducer;
