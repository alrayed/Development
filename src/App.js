import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FoodGrid from './components/FoodGrid';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import './App.css';
import Account from './components/Account';
import Chatbot from './components/Chatbot';
import SignUp from './components/SignUp';
import  About from './components/about';
import Payment from './components/Payment';
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

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
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
    setShowPayment(true);
    setCartOpen(false);
  };
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
  const [accountOpen, setAccountOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const handlePaymentComplete = () => {
  // Save order to localStorage
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const newOrder = {
    id: Date.now(),
    items: cart,
    user: user,
    date: new Date().toLocaleString(),
  };
  localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));
  setShowPayment(false);
  setCart([]);
};
 const handleSignup = () => {
  setUser(JSON.parse(localStorage.getItem("user")));
  setAccountOpen(false);
  window.location.hash = "#/";
};

 const handleLogout = () => {
  localStorage.removeItem("user");
  setUser(null);
  setAccountOpen(false);
  window.location.hash = "#signup";
};


  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={<SignUp onSignup={handleSignup} />}
        />
        
        <Route
          path="/"
          element={
            <>
              <Navbar onCartClick={() => setCartOpen(true)} onAccountClick={() => setAccountOpen(true)} />
              <div className="hero-section">
                <div className="hero-left">
                  <span className="hero-welcome">Welcome to Burgers TNC</span>
                  <h1 className="hero-title">
                    Crafting Timeless Flavors<br />
                  </h1>
                  <button className="hero-menu-btn">View Menu</button>
                </div>
                <div className="hero-right">
                  <img
                    className="burger-img-lar
                    
                   src="https://i.postimg.cc/VvKXVSPF/burger.png"
                    alt="Burger"
                  />
                </div>
              </div>
<div className="category-panel">
  {['All', 'Dessert', 'Cool Drink', 'Breakfast', 'Fast Food'].map(cat => (
    <button
      key={cat}
      className={selectedCategory === cat ? 'category-btn active' : 'category-btn'}
      onClick={() => setSelectedCategory(cat)}
    >
      {cat}
    </button>
  ))}
</div>
<FoodGrid onAdd={handleAdd} selectedCategory={selectedCategory} />
        
              {cartOpen && (
                <Cart
                  items={cart}
                  onClose={() => setCartOpen(false)}
                  onOrder={handleOrder}
                />
              )}
              {showPayment && (
  <div className="payment-modal">
    <Payment onComplete={handlePaymentComplete} />
  </div>
)}
              <Footer />
              {user && (
  <div className={`account-slide-panel${accountOpen ? " open" : ""}`}>
    <button className="close-btn" onClick={() => setAccountOpen(false)}>×</button>
    <Account onLogout={handleLogout} />
  </div>
)}
            </>
          }
        />

        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Chatbot />
    </Router>
  );
};

export default App;
