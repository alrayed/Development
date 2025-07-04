import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FoodGrid from './components/FoodGrid';
import Cart from './components/Cart';
import './App.css';

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  React.useEffect(() => {
    const handler = (e) => {
      if (e.detail === 'cart') setCartOpen(true);
    };
    window.addEventListener('openCart', handler);
    return () => window.removeEventListener('openCart', handler);
  }, []);

  const handleAdd = (food) => {
    setCart(prev => {
      const found = prev.find(item => item.id === food.id);
      if (found) {
        return prev.map(item =>
          item.id === food.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...food, qty: 1 }];
    });
  };

  const handleOrder = () => {
    alert('Order placed!');
    setCart([]);
    setCartOpen(false);
  };

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
<div className="hero-section">
  <div className="hero-left">
    <span className="hero-welcome">Welcome to Burgers TNC</span>
    <h1 className="hero-title">
      Crafting Timeless<br />
      Flavors, One Bite<br />
      at a Time
      <span className="hero-mini-burgers">
        <img src="/assist/mini-burgers.png" alt="Mini Burgers" />
      </span>
    </h1>
    <button className="hero-menu-btn">View Menu</button>
  </div>
  <div className="hero-right">
    <img
      className="burger-img-large"
      src="/assist/burger.png"
      alt="Burger"
    />
  </div>
</div>
      <div className="food-bg">
        <FoodGrid onAdd={handleAdd} />
      </div>
      {cartOpen && (
        <Cart
          items={cart}
          onClose={() => setCartOpen(false)}
          onOrder={handleOrder}
        />
      )}
      <Footer />
    </>
  );
};
const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      © {new Date().getFullYear()} Burgers TNC. All rights reserved.
    </div>
    <div className="footer-links">
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/terms-of-service">Terms of Service</a>
      <a href="/contact">Contact Us</a>
    </div>
  </footer>
);
export { Footer };
export default App;