import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Coupon from './components/Coupon';
import './styles.css';

function App() {
  const [activeTab, setActiveTab] = useState('products');
  const cartCount = useSelector(state => state.cart.length);
  const wishlistCount = useSelector(state => state.wishlist.length);

  return (
    <div className="app">
      <header className="header">
        <h1>🛒 Shopping Cart</h1>
        <div className="header-stats">
          <span>🛍️ Cart: {cartCount}</span>
          <span>❤️ Wishlist: {wishlistCount}</span>
        </div>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          📦 Products
        </button>
        <button 
          className={activeTab === 'cart' ? 'active' : ''}
          onClick={() => setActiveTab('cart')}
        >
          🛒 Cart ({cartCount})
        </button>
        <button 
          className={activeTab === 'wishlist' ? 'active' : ''}
          onClick={() => setActiveTab('wishlist')}
        >
          ❤️ Wishlist ({wishlistCount})
        </button>
        <button 
          className={activeTab === 'coupon' ? 'active' : ''}
          onClick={() => setActiveTab('coupon')}
        >
          🏷️ Coupon
        </button>
      </nav>

      <div className="content">
        {activeTab === 'products' && <ProductList />}
        {activeTab === 'cart' && <Cart />}
        {activeTab === 'wishlist' && <Wishlist />}
        {activeTab === 'coupon' && <Coupon />}
      </div>
    </div>
  );
}

export default App;
