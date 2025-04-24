"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/slices/todosSlice";
import "./TodoForm.css";

function TodoForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text.trim()));
      setText("");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập công việc mới..."
      />
      <button type="submit" className="add-button">
        Thêm
      </button>
    </form>
  );
}

export default TodoForm;
