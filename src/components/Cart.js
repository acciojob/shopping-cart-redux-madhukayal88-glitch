// src/components/Cart.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  applyCoupon,
} from "../redux/actions";

const Cart = () => {
  const { cart, discount, appliedCoupon } = useSelector((s) => s);
  const dispatch = useDispatch();
  const [code, setCode] = useState("");

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  return (
    <div className="cart">
      <h2>🛒 Cart ({cart.length})</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>
          <span>₹{item.price}</span>

          <button
            data-testid={`decrease-qty-${item.id}`}
            onClick={() => dispatch(decreaseQuantity(item.id))}
          >
            −
          </button>

          <span data-testid={`qty-${item.id}`}>{item.quantity}</span>

          <button
            data-testid={`increase-qty-${item.id}`}
            onClick={() => dispatch(increaseQuantity(item.id))}
          >
            +
          </button>

          <button
            data-testid={`remove-from-cart-${item.id}`}
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            ❌ Remove
          </button>
        </div>
      ))}

      {/* Coupon Section */}
      <div className="coupon">
        <input
          data-testid="coupon-input"
          placeholder="Enter coupon (SAVE10, SAVE20)"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />
        <button
          data-testid="apply-coupon"
          onClick={() => dispatch(applyCoupon(code))}
        >
          Apply
        </button>
        {appliedCoupon && <p>✅ Applied: {appliedCoupon} ({discount}% off)</p>}
      </div>

      {/* Totals */}
      <div className="totals">
        <p>Subtotal: ₹{subtotal}</p>
        <p>Discount: −₹{discountAmount}</p>
        <p data-testid="cart-total">Total: ₹{total}</p>
      </div>
    </div>
  );
};

export default Cart;
