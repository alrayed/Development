import React from 'react';

const Cart = ({ items, onClose, onOrder }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-sidebar">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <div>No items in cart.</div>
      ) : (
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>
              {item.name} x {item.qty} (${item.price * item.qty})
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <strong>Total: ${total}</strong>
      </div>
      <button className="order-btn" onClick={onOrder} disabled={items.length === 0}>
        Order Now
      </button>
    </div>
  );
};

export default Cart;