import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist, removeFromWishlist } from '../redux/actions';

const products = [
  { id: 1, name: 'Laptop', price: 999, image: '💻', description: 'High-performance laptop' },
  { id: 2, name: 'Phone', price: 699, image: '📱', description: 'Latest smartphone' },
  { id: 3, name: 'Headphones', price: 199, image: '🎧', description: 'Noise-canceling headphones' },
  { id: 4, name: 'Watch', price: 299, image: '⌚', description: 'Smart watch with fitness tracking' },
  { id: 5, name: 'Camera', price: 799, image: '📷', description: 'Professional camera' },
  { id: 6, name: 'Tablet', price: 499, image: '📱', description: 'Portable tablet' }
];

function ProductList() {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <div className="product-list">
      <h2>📦 Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">{product.image}</div>
            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
            <div className="product-actions">
              <button 
                className="btn-add-cart"
                onClick={() => dispatch(addToCart(product))}
              >
                🛒 Add to Cart
              </button>
              <button 
                className={`btn-wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => {
                  if (isInWishlist(product.id)) {
                    dispatch(removeFromWishlist(product.id));
                  } else {
                    dispatch(addToWishlist(product));
                  }
                }}
              >
                {isInWishlist(product.id) ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
