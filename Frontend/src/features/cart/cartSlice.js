import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
      //   console.log(data);
      //   return data;
      return {
        product: data.singleProduct._id,
        name: data.singleProduct.name,
        price: data.singleProduct.price,
        image: data.singleProduct.image[0].url,
        stock: data.singleProduct.stock,
        quantity,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  success: false,
  message: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        //Already cart la add panna product thirupa add aagama check panrom
        const item = action.payload;
        const existingItem = state.cartItems.find(
          (i) => i.product === item.product,
        );
        if (existingItem) {
          //same product again aagama quantity mattum update panrom
          existingItem.quantity = item.quantity;
          state.message = `Updated ${item.name} quantity in the cart`;
        } else {
          state.cartItems.push(item);
          state.message = `${action.payload.name} added to cart`;
        }
        state.cartItems.push();
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { removeErrors, removeMessage } = cartSlice.actions;
export default cartSlice.reducer;
