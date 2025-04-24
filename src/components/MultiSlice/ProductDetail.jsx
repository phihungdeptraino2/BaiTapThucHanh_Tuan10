"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedProduct,
  clearSelectedProduct,
} from "../../store/slices/productSlice";
import { addItem, openCart } from "../../store/slices/cartSlice";
import "./ProductDetail.css";

function ProductDetail() {
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedProduct);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleAddToCart = () => {
    dispatch(addItem(product));
    dispatch(openCart());
  };

  const handleBack = () => {
    dispatch(clearSelectedProduct());
  };

  return (
    <div className="product-detail-overlay">
      <div className="product-detail">
        <button className="close-detail-button" onClick={handleBack}>
          ✕
        </button>

        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image || "/placeholder.svg"} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <h2 className="product-detail-name">{product.name}</h2>
            <p className="product-detail-price">{formatPrice(product.price)}</p>

            <div className="product-detail-stock">
              <span
                className={product.inStock > 0 ? "in-stock" : "out-of-stock"}
              >
                {product.inStock > 0 ? "Còn hàng" : "Hết hàng"}
              </span>
              {product.inStock > 0 && (
                <span className="stock-count">
                  ({product.inStock} sản phẩm)
                </span>
              )}
            </div>

            <div className="product-detail-description">
              <h3>Mô tả sản phẩm</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-detail-category">
              <strong>Danh mục:</strong>{" "}
              {product.category === "electronics" ? "Điện tử" : "Phụ kiện"}
            </div>

            <div className="product-detail-actions">
              <button
                className="add-to-cart-button"
                onClick={handleAddToCart}
                disabled={!isLoggedIn || product.inStock <= 0}
              >
                Thêm vào giỏ hàng
              </button>

              {!isLoggedIn && (
                <p className="login-message">Vui lòng đăng nhập để mua hàng</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
