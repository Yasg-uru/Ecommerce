import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../helper/axiosInstace";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  userdata: JSON.parse(localStorage.getItem("userdata")) || {},
  users:[]
};
export const registeruser = createAsyncThunk("auth/register", async (data) => {
  try {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("profile", data.profile);
    const res = axios.post("http://localhost:4000/user/register", formdata);
    await toast.promise(res, {
      loading: "...loading",
      success: (data) => {
        return data?.data?.message || "your account is successfully created";
      },
      error: "failed to register",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.message || "failed to register");
  }
});
export const login = createAsyncThunk("auth/login", async (formdata) => {
  try {
    const res = axios.post("http://localhost:4000/user/login", formdata, {
      withCredentials: true,
    });
    await toast.promise(res, {
      loading: "....loading",
      success: (data) => {
        return data.data?.message || "logged in successfully";
      },
      error: "failed to login",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.message || "failed to login");
  }
});
export const logout=createAsyncThunk("/auth/logout",async()=>{
  try {
    const res=await axios.post(`http://localhost:4000/user/logout`,{
      withCredentials:true
    })
    toast.success("logged out successfully");
    return res.data;

  } catch (error) {
    toast.error(error?.message || "failed to logged out")
    
  }
})
export const forgotpassword=createAsyncThunk("/auth/forgot",async (formdata)=>{
  try {
     const res=await axios.post(`http://localhost:4000/user/forgotpassword`,formdata,{
      withCredentials:true
     })
     toast.success("Email sent");
     return res.data
  } catch (error) {
    toast.error(error?.message || "failed to send mail")
    
  }
})
export const resetpassword=createAsyncThunk("/auth/resetpassword",async (formdata)=>{
  try {
    const res=await axios.post(``,formdata,{
      withCredentials:true
    })
    toast.success("successfully updated your password");
    return res.data;
  } catch (error) {
    toast.error(error?.message)
  }
})

export const getalluser=createAsyncThunk("/auth/alluser",async()=>{
  try {
    const res=await axios.get(`http://localhost:4000/user/getalluser`,{
      withCredentials:true
    })
    toast.success("fetched users successfully")
    return res.data;

  } catch (error) {
    toast.error(error?.message)
  }
})
export const changerole=createAsyncThunk("/auth/changerole",async (formdata)=>{
  try {
    console.log("this is a formdata inside  update role slice :"+formdata.id,formdata.role)
     const res=await axios.put(`http://localhost:4000/user/updaterole/${formdata.id}`,{role:formdata.role},{
      withCredentials:true
     })
     toast.success("updated role successfully")
     return res.data;
  } catch (error) {
    toast.error(error?.message);
  }
})
export const deleteuser=createAsyncThunk("/auth/deleteuser",async(id)=>{
  try {
    const res=await axios.delete(`http://localhost:4000/user/deleteuser/${id}`,{
      withCredentials:true
    })
    toast.success("deleted user successfully")
    return res.data
  } catch (error) {
    toast.error(error?.message)
  }
})
export const  getme =createAsyncThunk("/auth/me",async()=>{
  try {
    const res=await axios.get(`http://localhost:4000/user/me`,{
      withCredentials:true
    })
    toast.success("fetched data successfully")
    return res.data;
  } catch (error) {
    toast.error(error?.message)
  }
})
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registeruser.fulfilled, (state, action) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userdata", JSON.stringify(action?.payload?.user));
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.role = action?.payload?.role;
        state.userdata = action?.payload?.user;
      })
      .addCase(login.fulfilled,(state,action)=>{
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userdata", JSON.stringify(action?.payload?.user));
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.role = action?.payload?.role;
        state.userdata = action?.payload?.user;
      })
      .addCase(getalluser.fulfilled,(state,action)=>{
        state.users=action?.payload?.user
      })
      .addCase(getme.fulfilled,(state,action)=>{
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userdata", JSON.stringify(action?.payload?.user));
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.role = action?.payload?.role;
        state.userdata = action?.payload?.user;
      })
      .addCase(logout.fulfilled,(state,action)=>{
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        localStorage.removeItem("userdata");
        state.isLoggedIn = false;
        state.role = "";
        state.userdata = {};
      })
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
