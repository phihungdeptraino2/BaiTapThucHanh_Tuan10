import { useSelector } from "react-redux";
import Counter from "./components/Counter/Counter";
import TodoList from "./components/TodoList/TodoList";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Auth from "./components/Auth/Auth";
import "./App.css";

function App() {
  const theme = useSelector((state) => state.theme.mode);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={`app ${theme}`}>
      <div className="app-header">
        <ThemeToggle />
        {isLoggedIn && (
          <div className="welcome-message">
            Xin chào, <strong>{user.name}</strong>!
          </div>
        )}
      </div>

      <h1>Redux Toolkit Examples</h1>

      <section className="counter-section">
        <h2>1. Counter App</h2>
        <Counter />
      </section>

      <section className="todo-section">
        <h2>2. Todo List</h2>
        <TodoList />
      </section>

      <section className="theme-section">
        <h2>3. Toggle Theme</h2>
        <p>
          Chế độ hiện tại: <strong>{theme === "light" ? "Sáng" : "Tối"}</strong>
        </p>
        <p>Bạn có thể chuyển đổi chế độ bằng nút ở trên cùng của trang.</p>
      </section>

      <section className="cart-section">
        <h2>4. Giỏ hàng</h2>
        <ShoppingCart />
      </section>

      <section className="auth-section">
        <h2>5. Quản lý user đăng nhập</h2>
        <Auth />
      </section>
    </div>
  );
}

export default App;
