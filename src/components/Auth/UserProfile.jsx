"use client";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import "./UserProfile.css";

function UserProfile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) return null;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          className="avatar"
        />
        <div className="user-info">
          <h3>Xin chào, {user.name}!</h3>
          <p className="email">{user.email}</p>
        </div>
      </div>

      <div className="profile-actions">
        <button className="logout-button" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
