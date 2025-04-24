import ProductList from "./ProductList";
import Cart from "./Cart";
import "./ShoppingCart.css";

function ShoppingCart() {
  return (
    <div className="shopping-cart">
      <ProductList />
      <Cart />
    </div>
  );
}

export default ShoppingCart;
