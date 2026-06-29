import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Register API

export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data", //form data use panrom because we are sending image data
        },
      };
      const { data } = await axios.post("/api/v1/register", userData, config); //db la store pannithu response vanthurum
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Registration failed.Please try again later",
      );
    }
  },
);
//Get User Profile API

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/profile");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to load user profile",
      );
    }
  },
);

//User login API

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
        config,
      );
      console.log("Login Data", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Login failed.Please try again later",
      );
    }
  },
);

//user Logout API

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/logout");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Logout failed. Please try again later",
      );
    }
  },
);

//Update Profile

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        "/api/v1/profile/update",
        userData,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Profile Update failed");
    }
  },
);

//Update Password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (password, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        "api/v1/password/update",
        password,
        config,
      );
    } catch (error) {
      return rejectWithValue(error.response?.data || "Password Update failed");
    }
  },
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user") //user already register panni irukana check panna
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    message: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null; //succes message iruthalum remove pannirum namma backend la success msg kuthutha thu
    },
  },
  extraReducers: (builder) => {
    builder
      //Register function
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
        //Store in localStorage =>user data store aagum
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(state.isAuthenticated),
        );
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload?.error ||
          "Registration failed.Please try again later";
        state.user = null;
        state.isAuthenticated = false;
      });

    //login function

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(state.isAuthenticated),
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Login failed. Please try again later";
        state.user = null;
        state.isAuthenticated = false;
      });

    //Loading User Profile
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
        //Store in localStorage =>user data store aagum
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(state.isAuthenticated),
        );
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load user profile";
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
        localStorage.setItem("isAuthenticated", "false");
      });

    //Logout function
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
        localStorage.setItem("isAuthenticated", "false");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Logout failed. Please try again later";
      });

    //Update Profile Function
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload?.user || state.user;
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Profile update failed. Please try again later";
      });

    //Update Password

    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Password update failed. Please try again later";
      });
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
