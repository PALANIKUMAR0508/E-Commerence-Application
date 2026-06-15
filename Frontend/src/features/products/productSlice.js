import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Product API

export const getProduct = createAsyncThunk(
  //async=>createAsyncThunk
  "product/getProduct",
  async ({ keyword, page = 1, category } = {}, { rejectWithValue }) => {
    //keyword=>vanthu productnav la irukum
    try {
      let link = `/api/v1/products?page=${page}`;
      if (category) link += `&category=${encodeURIComponent(category)}`; //user category kuthu irutha kuda category add aagum url la
      if (keyword) link += `&keyword=${encodeURIComponent(keyword)}`; //user keyword kuthu irutha kuda keyword add aagum url la

      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

export const getProductDetails = createAsyncThunk(
  //async=>createAsyncThunk
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
    product: null,
    resultPerPage: 0,
    totalPages: 0,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //builder=>livecycle method
    builder //ethu ellam AsyncThunk property
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        //action=>user show panra data
        state.loading = false; //payload=>backend la iruthu vatha data
        state.error = null;
        state.products = payload?.products ?? []; //products,productCount=>backend la productcontroller kuduthathu
        state.productCount = payload?.productCount ?? 0;
        state.resultPerPage = payload?.resultPerPage ?? 0;
        state.totalPages = payload?.totalPages ?? 0;
      })
      .addCase(getProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.products = [];
        state.error = payload || "Something went wrong";
      })

      // Get Single Product
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(getProductDetails.fulfilled, (state, { payload }) => {
        //action=>user show panra data
        state.loading = false; //payload=>backend la iruthu vatha data
        state.error = null;
        state.product = payload?.singleProduct ?? null;
      })
      .addCase(getProductDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Something went wrong";
      });
  },
});

export const { removeErrors } = productSlice.actions;
export default productSlice.reducer;
