import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  loginUser,
  signOut,
  checkAuth,
  fetchLoggedInUserOrders,
  updateUser,
  resetPasswordRequest,
  resetPassword
} from "./authAPI";

const initialState = {
  LoggedInUser: null,
  status: "idle",
  error: null,
  userChecked: false,
  loading: true,
  mailSent:false,
  passwordReset:false
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }

    // The value we return becomes the `fulfilled` action payload
  }
);

export const checkAuthAsync = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const resetPasswordRequestAsync = createAsyncThunk(
  "auth/resetPasswordRequest",
  async (emailInfo) => {
    try {
      const response = await resetPasswordRequest(emailInfo);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (password) => {
    try {
      const response = await resetPassword(password);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);


export const signOutAsync = createAsyncThunk("auth/signOut", async () => {
  const response = await signOut();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "auth/fetchLoggedInUserOrders",
  async () => {
    const response = await fetchLoggedInUserOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    errorhandler: (state) => {
      state.error = null;
    },
    mailsent:(state)=>{
      state.mailSent=false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = action.payload;
        state.userChecked = true;
        state.loading = false;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.userChecked = false;
      })
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = action.payload;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
         state.status = "idle";
         state.mailSent = true
      }).addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
         state.status = "idle";
          state.passwordReset = true
      });
  },
});

export const selectLoggedinUser = (state) => state.auth.LoggedInUser;
export const selectLoggedinUserOrders = (state) =>
  state.auth.LoggedInUser.orders;
export const selectError = (state) => state.auth.error;
export const selectuserChecked = (state) => state.auth.userChecked;
export const selectStatus = (state) => state.auth.status;
export const selectLoading = (state) => state.auth.loading;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectpasswordReset = (state) => state.auth.passwordReset;

export const { errorhandler } = authSlice.actions;
export const { mailsent } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export default authSlice.reducer;
