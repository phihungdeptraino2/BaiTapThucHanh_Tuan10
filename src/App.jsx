import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./components/Counter/Counter";
import TodoList from "./components/TodoList/TodoList";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>Redux Toolkit Examples</h1>

      <section className="counter-section">
        <h2>1. Counter App</h2>
        <Counter />
      </section>

      <section className="todo-section">
        <h2>2. Todo List</h2>
        <TodoList />
      </section>
    </div>
  );
}

export default App;
