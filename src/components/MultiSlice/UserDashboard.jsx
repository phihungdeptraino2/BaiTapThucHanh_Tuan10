"use client";

import { useSelector } from "react-redux";
import "./UserDashboard.css";

function UserDashboard() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const theme = useSelector((state) => state.theme.mode);

  if (!isLoggedIn) {
    return (
      <div className="dashboard-login-message">
        <p>Vui lòng đăng nhập để xem thông tin tài khoản</p>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <div className="user-info">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            className="user-avatar"
          />
          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="user-preferences">
          <div className="preference-item">
            <span>Chế độ hiển thị:</span>
            <span className="preference-value">
              {theme === "light" ? "Sáng" : "Tối"}
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h3>Giỏ hàng của bạn</h3>
          {cartItems.length === 0 ? (
            <p className="empty-section">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
          ) : (
            <div className="cart-summary-list">
              <div className="summary-header">
                <span>Sản phẩm</span>
                <span>Số lượng</span>
              </div>
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>{item.name}</span>
                  <span>{item.quantity}</span>
                </div>
              ))}
              <div className="summary-total">
                <span>Tổng số sản phẩm:</span>
                <span>
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
