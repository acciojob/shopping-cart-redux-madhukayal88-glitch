// src/components/Wishlist.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, addToCart } from "../redux/actions";

const Wishlist = () => {
  const wishlist = useSelector((s) => s.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="wishlist">
      <h2>❤️ Wishlist ({wishlist.length})</h2>

      {wishlist.length === 0 && <p>Wishlist is empty</p>}

      {wishlist.map((item) => (
        <div key={item.id} className="wishlist-item">
          <span>{item.name}</span>
          <span>₹{item.price}</span>

          <button
            data-testid={`move-to-cart-${item.id}`}
            onClick={() => dispatch(addToCart(item))}
          >
            Move to Cart
          </button>

          <button
            data-testid={`remove-from-wishlist-${item.id}`}
            onClick={() => dispatch(removeFromWishlist(item.id))}
          >
            ❌ Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
