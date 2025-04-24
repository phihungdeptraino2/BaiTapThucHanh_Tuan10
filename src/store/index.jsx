import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import todosReducer from "./slices/todosSlice";
import themeReducer from "./slices/themeSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/usersSlice";
import calculatorReducer from "./slices/calculatorSlice";
import eventsReducer from "./slices/eventsSlice";
import productReducer from "./slices/productSlice";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Core app state
    theme: themeReducer,
    auth: authReducer,

    // Feature slices
    counter: counterReducer,
    todos: todosReducer,
    cart: cartReducer,
    users: usersReducer,
    calculator: calculatorReducer,
    events: eventsReducer,
    products: productReducer,
  },
  // Optional middleware configuration
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== "production",
});
