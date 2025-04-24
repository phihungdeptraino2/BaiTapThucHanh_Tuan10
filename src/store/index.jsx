import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import todosReducer from "./slices/todosSlice";
import themeReducer from "./slices/themeSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/usersSlice";
import calculatorReducer from "./slices/calculatorSlice";
import eventsReducer from "./slices/eventsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    theme: themeReducer,
    cart: cartReducer,
    auth: authReducer,
    users: usersReducer,
    calculator: calculatorReducer,
    events: eventsReducer,
  },
});
