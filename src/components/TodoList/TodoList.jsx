import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import "./TodoList.css";

function TodoList() {
  const todos = useSelector((state) => state.todos.todos);

  return (
    <div className="todo-list">
      <TodoForm />

      <div className="todos-container">
        {todos.length === 0 ? (
          <p className="empty-message">
            Chưa có công việc nào. Hãy thêm công việc mới!
          </p>
        ) : (
          <ul className="todos">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoList;
