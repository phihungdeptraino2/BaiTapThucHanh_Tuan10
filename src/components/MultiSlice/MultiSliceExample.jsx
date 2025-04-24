"use client";

import { useSelector } from "react-redux";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import CartSidebar from "./CartSidebar";
import UserDashboard from "./UserDashboard";
import "./MultiSliceExample.css";

function MultiSliceExample() {
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );
  const cartItemCount = useSelector((state) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0)
  );

  return (
    <div className="multi-slice-example">
      <div className="multi-slice-header">
        <h3>Ví dụ kết hợp nhiều slice</h3>
        <div className="cart-indicator">
          <span>Giỏ hàng: {cartItemCount} sản phẩm</span>
        </div>
      </div>

      <div className="multi-slice-content">
        <div className="product-section">
          <ProductList />
        </div>

        <div className="dashboard-section">
          <h4>Thông tin người dùng</h4>
          <UserDashboard />
        </div>
      </div>

      {selectedProduct && <ProductDetail />}
      <CartSidebar />
    </div>
  );
}

export default MultiSliceExample;
