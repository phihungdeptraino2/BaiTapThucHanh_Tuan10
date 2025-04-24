"use client";

import { useDispatch } from "react-redux";
import { toggleTodo, removeTodo } from "../../store/slices/todosSlice";
import "./TodoItem.css";

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <li className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
        />
        <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
          {todo.text}
        </span>
      </div>
      <button
        className="remove-button"
        onClick={() => dispatch(removeTodo(todo.id))}
      >
        Xoá
      </button>
    </li>
  );
}

export default TodoItem;
