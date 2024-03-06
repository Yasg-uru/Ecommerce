import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const initialState = {
  myorders:[],
  key: "",
  order_id: "",
  ispaymentverified: false,
  orders:[]
};
export const getkey = createAsyncThunk("/order/getkey", async () => {
  try {
    const res = await axios.get(`http://localhost:4000/order/getkey`, {
      withCredentials: true,
    });
    toast.success("fetched key successfully");
    console.log("this is a data of the key :" + res.data.key);
    return res.data;
  } catch (error) {
    return toast.error(error?.message || "failed to fetch key");
  }
});
export const verification=createAsyncThunk("/order/verification",async(paymentdetail)=>{
  try {
    for (const key in paymentdetail) {
      console.log(`${key}: ${paymentdetail[key]}`);
    }
    
    const res=await axios.post(`http://localhost:4000/order/verification`, {
      razorpay_payment_id: paymentdetail.razorpay_payment_id,
      razorpay_order_id: paymentdetail.razorpay_order_id,
      razorpay_signature: paymentdetail.razorpay_signature,
    },{
      withCredentials:true
    })
    toast.success("verification successfully");
    return res.data;

  } catch (error) {
    toast.error(error?.message || "failed to verify")
    
  }
})
export const createorder = createAsyncThunk("order/create", async (data) => {
  try {
   
    const res = await axios.post(`http://localhost:4000/order/create`,data,{
      withCredentials:true
    });
    // await toast.promise(res, {
    //   loading: "...loading",
    //   success: (data) => {
    //     return data?.data?.message || "order created successfully";
    //   },
    //   error: "failed to create order",
    // });
    toast.success("order created successully")
    return res.data;
  } catch (error) {
    toast.error(error?.message);
  }
});
export const updatetorder = createAsyncThunk("order/update", async (id) => {
  try {
    const res = await axios.put(
      `http://localhost:4000/order/update/${id}`,{},
      {
        withCredentials:true
      }
    );
    toast.success("order updated successfully")
    return res.data;
  } catch (error) {
    toast.error(error?.message);
  }
});
export const myorders = createAsyncThunk("order/myorder", async () => {
  try {
    const res = axios.get(
    `http://localhost:4000/order/myorder`,
    {
      withCredentials:true
    }
    );
    await toast.promise(res, {
      loading: "...loading",
      success: (data) => {
        return data?.data?.message || "fetched your order successfully";
      },
      error: "failed to fetch your orders ",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.message);
  }
});
export const getorders=createAsyncThunk("/orders/gets",async()=>{
  try {
     const res=await axios.get("http://localhost:4000/order/getorder",{
      withCredentials:true
     })
     toast.success("fetched order successfully")
     return res.data;

  } catch (error) {
    toast.error(error?.message)
  }
})
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getkey.fulfilled, (state, action) => {
        console.log("this is a ley :" + action?.payload?.key);
        state.key = action?.payload?.key;
      })
      .addCase(getkey.rejected, (state) => {
        state.key = "";
        toast.error("rejected your getkey ");
      })
      .addCase(createorder.fulfilled,(state,action)=>{
        state.order_id=action?.payload?.order?.ORDER_ID
      })
      .addCase(verification.fulfilled,(state,action)=>{
        toast.success("payment verified successfully your order created successfully")
        state.ispaymentverified=true
      })
      .addCase(verification.rejected,(state,action)=>{
        toast.error("payment verification failed ");
        state.ispaymentverified=false
      })
      .addCase(myorders.fulfilled,(state,action)=>{
state.myorders=action?.payload?.orders;
      })
      
  },
});
export const {} = orderSlice.actions;
export default orderSlice.reducer;
