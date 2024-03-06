import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const initialState = {
  venderdata: {},
  hasvender: false,
  venders: [],
  products: [],
  orders:[]
};
export const createvender = createAsyncThunk(
  "/vender/create",
  async (formdata) => {
    try {
      const res = axios.post(`http://localhost:4000/vender/create`, formdata, {
        withCredentials: true,
      });
      await toast.promise(res, {
        loading: "...loading",
        success: (data) => {
          return data?.message || "vender created successfully";
        },
        error: "failed to createt vender",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.message || "failed to create vender");
    }
  }
);
export const updatevender = createAsyncThunk("/vender/update", async (data) => {
  try {
    const res = axios.put(`http://localhost:4000/vender/update`, data, {
      withCredentials: true,
    });
    await toast.promise(res, {
      loading: "...loading",
      success: (data) => {
        return data?.message || "updated successfully";
      },
      error: "failed to update vender",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.message || "failed to update vender");
  }
});
export const getvender = createAsyncThunk("/vender/get", async () => {
  try {
    const res = axios.get(`http://localhost:4000/vender/getdetails`, {
      withCredentials: true,
    });
    await toast.promise(res, {
      loading: "...loading",
      success: (data) => {
        return data?.message || "fetched vender successfully";
      },
      error: "failed to fetch vender",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.message || "failed to fetch vender");
  }
});
export const getvenders = createAsyncThunk("/vender/getall", async () => {
  try {
    const res = await axios.get(`http://localhost:4000/vender/getallvender`, {
      withCredentials: true,
    });
    toast.success("fetched successfully");
    return res.data;
  } catch (error) {
    toast.error(error?.message || "failed to fetch the venders");
  }
});
export const deletevender = createAsyncThunk("/vender/delete", async (id) => {
  try {
    const res = axios.delete(
      `http://localhost:4000/vender/deletedvender/${id}`,
      {
        withCredentials: true,
      }
    );
    await toast.promise(res, {
      loading: "..loading",
      success: (data) => {
        return data?.message || "deleted vender successfully";
      },
      error: "failed to delete vender",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.message || "failed to delete");
  }
});
export const approve = createAsyncThunk("/vender/approve", async (id) => {
  try {
    const res = axios.post(
      `http://localhost:4000/vender/approve/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    toast.success("updated successfully");
    return (await res).data;
  } catch (error) {
    toast.error(error?.message || "failed to update status");
  }
});
export const reject = createAsyncThunk("/vender/reject", async (id) => {
  try {
    const res = axios.post(
      `http://localhost:4000/vender/reject/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    toast.success("status updated successfully");
    return (await res).data;
  } catch (error) {
    toast.error(error?.message || "failed to update status");
  }
});
export const getvenderproduct = createAsyncThunk(
  "/vender/products",
  async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/vender/getvenderproducts/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("fetched products successfully");
      return res.data;
    } catch (error) {
      toast.error(error?.message || "failed to fetch products");
    }
  }
);
export const getvenderorders = createAsyncThunk(
  "/vender/orders",
  async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/vender/getvenderorders/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("fetched orders succcessfully");
      return res.data;

    } catch (error) {
      toast.error(error?.message)
    }
  }
);
const venderSlice = createSlice({
  name: "vender",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getvender.fulfilled, (state, action) => {
        state.venderdata = action?.payload?.venderuserwithvender?.vender;
        state.hasvender = true;
      })
      .addCase(getvenders.fulfilled, (state, action) => {
        state.venders = action?.payload?.venders;
      })
      .addCase(getvenderproduct.fulfilled, (state, action) => {
        state.products = action?.payload?.vender?.products;
      })
      .addCase(getvenderorders.fulfilled,(state,action)=>{
        state.orders=action?.payload?.orders?.orders
      })
  },
});
export const {} = venderSlice.actions;
export default venderSlice.reducer;
