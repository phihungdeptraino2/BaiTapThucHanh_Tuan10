"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setError } from "../../store/slices/authSlice";
import "./LoginForm.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!username.trim()) {
      dispatch(setError("Vui lòng nhập tên đăng nhập"));
      return;
    }

    if (!password.trim()) {
      dispatch(setError("Vui lòng nhập mật khẩu"));
      return;
    }

    // In a real app, you would make an API call here
    // For this demo, we'll just simulate a successful login
    dispatch(
      login({
        username,
        name: username, // Using username as name for simplicity
        email: `${username}@example.com`,
        avatar: "/placeholder.svg?height=100&width=100",
      })
    );
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Đăng nhập</h3>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên đăng nhập"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />
        </div>

        <button type="submit" className="login-button">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
