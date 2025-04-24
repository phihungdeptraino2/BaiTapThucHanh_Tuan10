"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
} from "../../store/slices/cartSlice";
import "./Cart.css";

function Cart() {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h3>Giỏ hàng</h3>
        <p>Giỏ hàng của bạn đang trống</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h3>Giỏ hàng ({itemCount} sản phẩm)</h3>
        <button className="clear-cart-button" onClick={handleClearCart}>
          Xóa tất cả
        </button>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p className="cart-item-price">${item.price}</p>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-control">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                className="remove-item-button"
                onClick={() => handleRemoveItem(item.id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Tổng cộng:</span>
          <span className="total-price">${total.toFixed(2)}</span>
        </div>
        <button className="checkout-button">Thanh toán</button>
      </div>
    </div>
  );
}

export default Cart;
