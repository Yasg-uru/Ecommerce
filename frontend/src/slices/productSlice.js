import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const initialState = {
  products: [],
  product:{},
  adminproducts:[]
 
};
export const getproducts = createAsyncThunk(
  "product/get",
  async (searchquery) => {
    try {
      const res = axios.get(
        `http://localhost:4000/product/get?search=${searchquery}`,
        {
          withCredentials: true,
        }
      );

      await toast.promise(res, {
        loading: "...loading",
        success: (data) => {
          return data?.data?.message || "fetched successfully";
        },
        error: "failed to search your product",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.message || "failed to search");
    }
  }
);
export const updateproduct=createAsyncThunk("/product/update",async(id,formdata)=>{
  try {
     const res=axios.put(`http://localhost:4000/product/update/${id}`,{formdata},{
      withCredentials:true
     });
     await toast.promise(res,{
      loading:"...loading",
      success:(data)=>{
        return data?.message || "updated product successfully"
      },
      error:"failed to update"
     })
     return (await res).data;

  } catch (error) {
    toast.error(error?.message || "failed to update product")
    
  }
})
export const getproductbyid = createAsyncThunk("products/get", async (id) => {
  try {
    const res = axios.get(`http://localhost:4000/product/products/${id}`, {
      withCredentials: true,
    });

    await toast.promise(res, {
      loading: "...loading",
      success: (data) => {
        return data?.data?.message || "fetched successfully";
      },
      error: "failed to search your product",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.message || "failed to search");
  }
});
export const createproducts = createAsyncThunk(
  "products/create",
  async (formdata) => {
    try {
      const res = axios.post("http://localhost:4000/product/create", formdata, {
        withCredentials: true,
      
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      });
      await toast.promise(res, {
        loading: "...creating",
        success: (data) => {
          return data?.data?.mesage || "product created successfully";
        },
        error: "failed to product creation",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.message || "failed to create product ");
    }
  }
);
export const getadminproduct=createAsyncThunk("/prpoducts/admin",async ()=>{
  try {
    const res=await axios.get(`http://localhost:4000/product/getproducts`,{
      withCredentials:true
    })
    toast.success("fetched products successfully");
    return res.data;
  } catch (error) {
    toast.error(error?.message);

  }
})
export const addreview = createAsyncThunk("product/review", async (formdata) => {
  try {
    

   
    const res =  axios.post(
      `http://localhost:4000/product/review`,
      formdata,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    await toast.promise(res, {
      loading: "...loading",
      success: (data) => {
        return data?.data?.mesage || "thanks for giving review";
      },
      error: "failed to add review",
    });
    toast.success("review addess successfully");
    return (await res).data;
  } catch (error) {
    toast.error(error?.message || "failed to add review ");
  }
});
export const deletereview = createAsyncThunk(
  "product/review/delete",
  async (id) => {
    try {
      const res = axios.delete(
        `http://localhost:4000/product/review/delete/${id}`
      );
      await toast.promise(res, {
        loading: "...loading",
        success: (data) => {
          return data?.data?.message || "failed to delete review";
        },
        error: "failed to delete review",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error.message || "failed to delete review");
    }
  }
);
export const deleteproduct = createAsyncThunk("product/delete", async (id) => {
  try {
    const res = axios.delete(`http://localhost:4000/product/delete/${id}`,{
      withCredentials:true
    });
    await toast.promise(res, {
      loading: "...loading",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to delete product",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.mesage || "product deletion failed");
  }
});
const productslice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getproducts.fulfilled, (state, action) => {
        state.products = action?.payload?.products;
      })
      .addCase(getproductbyid.fulfilled, (state, action) => {
        console.log("this is a product by id"+action?.payload?.products)
        state.product = action?.payload?.products;
      })
      .addCase(getadminproduct.fulfilled,(state,action)=>{
        state.adminproducts=action?.payload?.products
      })
  },
});
export const {} = productslice.actions;
export default productslice.reducer;
