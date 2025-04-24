import { useSelector } from "react-redux";
import Counter from "./components/Counter/Counter";
import TodoList from "./components/TodoList/TodoList";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";

import "./App.css";

function App() {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={`app ${theme}`}>
      <ThemeToggle />

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
    </div>
  );
}

export default App;
