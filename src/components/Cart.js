import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/actions';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const discount = useSelector(state => state.discount);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <h2>🛒 Your Cart is Empty</h2>
        <p>Start shopping to add items to your cart!</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>🛒 Shopping Cart</h2>
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <span className="cart-item-image">{item.image}</span>
              <div>
                <h4>{item.name}</h4>
                <p>${item.price}</p>
              </div>
            </div>
            
            <div className="cart-item-controls">
              <button 
                className="qty-btn"
                onClick={() => dispatch(decreaseQuantity(item.id))}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span className="qty">{item.quantity}</span>
              <button 
                className="qty-btn"
                onClick={() => dispatch(increaseQuantity(item.id))}
              >
                +
              </button>
            </div>

            <div className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button 
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="summary-row discount">
            <span>Discount ({discount}%):</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="summary-row total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="coupon-applied">
            ✅ Coupon applied! You saved ${discountAmount.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
