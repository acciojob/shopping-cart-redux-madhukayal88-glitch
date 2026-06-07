import React, { useState } from "react";
import "./../styles/App.css";

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 },
  { id: 3, name: "Headphones", price: 3000 }
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const addToCart = (product) => {
    const item = cart.find((p) => p.id === product.id);

    if (item) {
      setCart(
        cart.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((p) =>
          p.id === id
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const addToWishlist = (product) => {
    if (!wishlist.find((p) => p.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((p) => p.id !== id));
  };

  const applyCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscount(10);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const finalTotal = total - (total * discount) / 100;

  return (
    <div>
      <h1>Shopping Cart</h1>

      <h2>Products</h2>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>

          <button onClick={() => addToCart(product)}>
            Add To Cart
          </button>

          <button onClick={() => addToWishlist(product)}>
            Add To Wishlist
          </button>

          <hr />
        </div>
      ))}

      <h2>Cart</h2>

      {cart.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} - ₹{item.price}
          </p>

          <button onClick={() => decreaseQty(item.id)}>
            -
          </button>

          <span> {item.quantity} </span>

          <button onClick={() => increaseQty(item.id)}>
            +
          </button>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>

          <hr />
        </div>
      ))}

      <input
        type="text"
        placeholder="Coupon Code"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />

      <button onClick={applyCoupon}>
        Apply Coupon
      </button>

      <h3>Total: ₹{finalTotal}</h3>

      <h2>Wishlist</h2>

      {wishlist.map((item) => (
        <div key={item.id}>
          {item.name}

          <button
            onClick={() => removeFromWishlist(item.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
