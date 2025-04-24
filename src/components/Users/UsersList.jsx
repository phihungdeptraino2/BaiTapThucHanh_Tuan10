"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  selectAllUsers,
  selectUsersStatus,
  selectUsersError,
} from "../../store/slices/usersSlice";
import "./UsersList.css";

function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);

  useEffect(() => {
    // Only fetch users if we haven't already
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchUsers());
  };

  let content;

  if (status === "loading") {
    content = (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  } else if (status === "succeeded") {
    content = (
      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-avatar">{user.name.charAt(0)}</div>
            <div className="user-details">
              <h4>{user.name}</h4>
              <p className="user-username">@{user.username}</p>
              <p className="user-email">{user.email}</p>
              <p className="user-company">{user.company.name}</p>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (status === "failed") {
    content = (
      <div className="error-container">
        <p className="error-message">Lỗi: {error}</p>
        <button className="retry-button" onClick={handleRefresh}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h3>Danh sách người dùng từ API</h3>
        <button
          className="refresh-button"
          onClick={handleRefresh}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Đang tải..." : "Làm mới"}
        </button>
      </div>
      {content}
    </div>
  );
}

export default UsersList;
