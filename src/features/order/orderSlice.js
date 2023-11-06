import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder, fetchAllOrder, UpdateOneOrder } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrderPlaced: null,
  totalOrders: 0,
};

export const addOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (order) => {
    const response = await addOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrderAsync = createAsyncThunk(
  "order/fetchAllOrder",
  async ({sort,pagination}) => {
    const response = await fetchAllOrder(sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const UpdateOneOrderAsync = createAsyncThunk(
  "order/UpdateOneOrder",
  async (order) => {
    const response = await UpdateOneOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetOrder: (state) => {
      state.currentOrderPlaced = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrderPlaced = action.payload;
      })
      .addCase(fetchAllOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(UpdateOneOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateOneOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (item) => item.id === action.payload.id
        );
        state.orders[index] = action.payload;
      });
  },
});
export const { resetOrder } = orderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectcurrentOrderPlaced = (state) =>
  state.order.currentOrderPlaced;
export const allOrders = (state) => state.order.orders;
export const TotalOrdersCount = (state) => state.order.totalOrders;

export default orderSlice.reducer;
