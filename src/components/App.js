// src/App.js
import React from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>🛒 Shopping Cart - Redux Assignment</h1>
      <div className="layout">
        <ProductList />
        <div className="right-side">
          <Cart />
          <Wishlist />
        </div>
      </div>
    </div>
  );
}

export default App;
