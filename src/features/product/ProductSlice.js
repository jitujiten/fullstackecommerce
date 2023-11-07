import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProduct,
  fetchProductsByFilter,
  fetchAllCategory,
  fetchAllBrands,
  fetchProductById,
  addProduct,
  EditProduct,
} from "./ProductAPI";

const initialState = {
  products: [],
  SelectedProduct: null,
  brands: [],
  category: [],
  totalItems: 0,
  status: "idle",
};

export const fetchAllProductAsync = createAsyncThunk(
  "product/fetchAllProduct",
  async () => {
    const response = await fetchAllProduct();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilter(filter, sort, pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async () => {
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllCategoryAsync = createAsyncThunk(
  "product/fetchAllCategory",
  async () => {
    const response = await fetchAllCategory();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const addProductAsync = createAsyncThunk(
  "product/addProduct",
  async (product) => {
    const response = await addProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const EditProductAsync = createAsyncThunk(
  "product/EditProduct",
  async (product) => {
    const response = await EditProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearSelectedProduct: (state) => {
      state.SelectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.SelectedProduct = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchAllCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(EditProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(EditProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});
export const { clearSelectedProduct } = productSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAllProducts = (state) => state.product.products;
export const selecttotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategory = (state) => state.product.category;
export const selectedProduct = (state) => state.product.SelectedProduct;
export const selectProductlistStatus = (state) => state.product.status;

export default productSlice.reducer;
