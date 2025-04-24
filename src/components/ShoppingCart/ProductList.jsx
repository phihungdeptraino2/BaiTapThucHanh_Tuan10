"use client";

import { useDispatch } from "react-redux";
import { addItem } from "../../store/slices/cartSlice";
import "./ProductList.css";

// Sample product data
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 800,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Headphones",
    price: 100,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Keyboard",
    price: 50,
    image: "/placeholder.svg?height=80&width=80",
  },
];

function ProductList() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="product-list">
      <h3>Sản phẩm</h3>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h4>{product.name}</h4>
              <p className="product-price">${product.price}</p>
            </div>
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(product)}
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
