"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectFilteredProducts,
  selectProductStatus,
  selectProductError,
  selectProduct,
  selectProductFilters,
  setFilter,
  resetFilters,
} from "../../store/slices/productSlice";
import "./ProductList.css";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);
  const filters = useSelector(selectProductFilters);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleViewProduct = (productId) => {
    dispatch(selectProduct(productId));
  };

  const handleCategoryChange = (e) => {
    dispatch(setFilter({ category: e.target.value }));
  };

  const handlePriceChange = (e, type) => {
    const value = Number.parseInt(e.target.value, 10) || 0;
    dispatch(setFilter({ [type]: value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (status === "loading") {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (status === "failed") {
    return <div className="error-message">Lỗi: {error}</div>;
  }

  return (
    <div className="product-catalog">
      <div className="product-filters">
        <h3>Bộ lọc</h3>
        <div className="filter-group">
          <label htmlFor="category">Danh mục:</label>
          <select
            id="category"
            value={filters.category}
            onChange={handleCategoryChange}
          >
            <option value="all">Tất cả</option>
            <option value="electronics">Điện tử</option>
            <option value="accessories">Phụ kiện</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="minPrice">Giá tối thiểu:</label>
          <input
            type="number"
            id="minPrice"
            value={filters.minPrice}
            onChange={(e) => handlePriceChange(e, "minPrice")}
            min="0"
            step="500000"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="maxPrice">Giá tối đa:</label>
          <input
            type="number"
            id="maxPrice"
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange(e, "maxPrice")}
            min="0"
            step="500000"
          />
        </div>

        <button className="reset-filters-button" onClick={handleResetFilters}>
          Đặt lại bộ lọc
        </button>
      </div>

      <div className="products-container">
        <h3>Sản phẩm ({products.length})</h3>

        {products.length === 0 ? (
          <div className="no-products">
            Không tìm thấy sản phẩm phù hợp với bộ lọc.
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-price">{formatPrice(product.price)}</p>
                  <p className="product-stock">
                    Còn lại: <strong>{product.inStock}</strong>
                  </p>
                </div>
                <button
                  className="view-product-button"
                  onClick={() => handleViewProduct(product.id)}
                >
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
