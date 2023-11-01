import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
};


export const addOrderAsync = createAsyncThunk(
  'order/addOrder',
  async (order) => {
    const response = await addOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
      });
  },
});

export const { increment } = orderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

export default orderSlice.reducer;
