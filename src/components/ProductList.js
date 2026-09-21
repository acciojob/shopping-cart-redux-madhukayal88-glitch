// src/components/ProductList.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../redux/actions";

const products = [
  { id: 1, name: "iPhone 15", price: 80000, image: "📱" },
  { id: 2, name: "Headphones", price: 3000, image: "🎧" },
  { id: 3, name: "Laptop", price: 60000, image: "💻" },
  { id: 4, name: "Watch", price: 5000, image: "⌚" },
];

const ProductList = () => {
  const dispatch = useDispatch();

  return (
    <div className="product-list">
      <h2>🛍️ Products</h2>
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <div className="emoji">{p.image}</div>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button
              data-testid={`add-to-cart-${p.id}`}
              onClick={() => dispatch(addToCart(p))}
            >
              Add to Cart
            </button>
            <button
              data-testid={`add-to-wishlist-${p.id}`}
              onClick={() => dispatch(addToWishlist(p))}
            >
              ❤️ Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
