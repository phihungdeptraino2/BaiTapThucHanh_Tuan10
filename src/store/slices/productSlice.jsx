import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock product data
      return [
        {
          id: "1",
          name: "Laptop Pro",
          price: 25000000,
          category: "electronics",
          image: "/placeholder.svg?height=200&width=300",
          description: "Laptop mạnh mẽ với CPU đa nhân và đồ họa cao cấp.",
          inStock: 10,
        },
        {
          id: "2",
          name: "Smartphone X",
          price: 12000000,
          category: "electronics",
          image: "/placeholder.svg?height=200&width=300",
          description:
            "Điện thoại thông minh với camera chất lượng cao và pin lâu.",
          inStock: 15,
        },
        {
          id: "3",
          name: "Tai nghe không dây",
          price: 2500000,
          category: "accessories",
          image: "/placeholder.svg?height=200&width=300",
          description: "Tai nghe Bluetooth với chất lượng âm thanh tuyệt vời.",
          inStock: 20,
        },
        {
          id: "4",
          name: "Bàn phím cơ",
          price: 1800000,
          category: "accessories",
          image: "/placeholder.svg?height=200&width=300",
          description: "Bàn phím cơ với đèn LED RGB và switch Cherry MX.",
          inStock: 8,
        },
      ];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  selectedProduct: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: {
    category: "all",
    minPrice: 0,
    maxPrice: 100000000,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = state.products.find(
        (product) => product.id === action.payload
      );
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { selectProduct, clearSelectedProduct, setFilter, resetFilters } =
  productSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectProductById = (state, productId) =>
  state.products.products.find((product) => product.id === productId);
export const selectProductStatus = (state) => state.products.status;
export const selectProductError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectProductFilters = (state) => state.products.filters;

// Filtered products selector
export const selectFilteredProducts = (state) => {
  const { products } = state.products;
  const { category, minPrice, maxPrice } = state.products.filters;

  return products.filter((product) => {
    const categoryMatch = category === "all" || product.category === category;
    const priceMatch = product.price >= minPrice && product.price <= maxPrice;
    return categoryMatch && priceMatch;
  });
};

export default productSlice.reducer;
