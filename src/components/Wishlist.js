import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist, addToCart } from '../redux/actions';

function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);

  if (wishlist.length === 0) {
    return (
      <div className="empty-state">
        <h2>❤️ Your Wishlist is Empty</h2>
        <p>Add items to your wishlist by clicking the heart icon!</p>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <h2>❤️ Wishlist</h2>
      
      <div className="wishlist-items">
        {wishlist.map(item => (
          <div key={item.id} className="wishlist-item">
            <div className="wishlist-item-info">
              <span className="wishlist-item-image">{item.image}</span>
              <div>
                <h4>{item.name}</h4>
                <p>${item.price}</p>
              </div>
            </div>
            
            <div className="wishlist-item-actions">
              <button 
                className="btn-add-cart"
                onClick={() => dispatch(addToCart(item))}
              >
                🛒 Add to Cart
              </button>
              <button 
                className="remove-btn"
                onClick={() => dispatch(removeFromWishlist(item.id))}
              >
                ❌ Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
