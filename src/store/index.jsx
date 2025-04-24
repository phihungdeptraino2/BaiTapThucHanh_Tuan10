import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import todosReducer from "./slices/todosSlice";
import themeReducer from "./slices/themeSlice";
import cartReducer from "./slices/cartSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    theme: themeReducer,
    cart: cartReducer,
  },
});
