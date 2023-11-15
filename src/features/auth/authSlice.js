import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  loginUser,
  signOut,
  checkAuth,
  fetchLoggedInUserOrders,
  updateUser,
  resetPasswordRequest,
  resetPassword,
} from "./authAPI";

const initialState = {
  LoggedInUser: null,
  orders:null,
  status: "idle",
  error: null,
  signupError:null,
  userChecked: false,
  loading: true,
  mailSent: false,
  passwordReset: false,
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
    
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);


export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async ({ loginInfo, alert }, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      alert.success("login successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
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

export const signOutAsync = createAsyncThunk("auth/signOut", async (alert) => {
  const response = await signOut();
  alert.success("logout successfully")
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
  async ({user,alert}) => {
    const response = await updateUser(user);
    alert.success("user data updated successfully")
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
    mailsent: (state) => {
      state.mailSent = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
        state.signupError = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.signupError = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
        state.error=null;
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
        state.orders = action.payload;
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
        state.mailSent = true;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordReset = true;
      });
  },
});

export const selectLoggedinUser = (state) => state.auth.LoggedInUser;
export const selectLoggedinUserOrders = (state) =>
  state.auth.orders;
export const selectError = (state) => state.auth.error;
export const selectSignUpError = (state) => state.auth.signupError;

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
