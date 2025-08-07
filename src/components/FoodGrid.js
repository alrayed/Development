import React, { useEffect, useState } from 'react';

const LOCAL_KEY = 'admin_items';
// Example fallbackItems in FoodGrid.js and AdminPanel.js
const fallbackItems = [
  { id: 1, name: 'Classic Burger', price: 5.99, img: '', category: 'Fast Food' },
  { id: 2, name: 'Cheese Burger', price: 6.99, img: '', category: 'Fast Food' },
  { id: 3, name: 'Chocolate Cake', price: 4.99, img: '', category: 'Dessert' },
  { id: 4, name: 'Orange Juice', price: 2.99, img: '', category: 'Cool Drink' },
  { id: 5, name: 'Pancakes', price: 3.99, img: '', category: 'Breakfast' },
];

const FoodGrid = ({ onAdd, selectedCategory }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : fallbackItems;
  });

  // Listen for changes in localStorage (e.g., from AdminPanel)
  useEffect(() => {
    const syncItems = () => {
      const saved = localStorage.getItem(LOCAL_KEY);
      setItems(saved ? JSON.parse(saved) : fallbackItems);
    };
    window.addEventListener('storage', syncItems);
    return () => window.removeEventListener('storage', syncItems);
  }, []);

  // Also update when the component mounts (in case AdminPanel updated in same tab)
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    setItems(saved ? JSON.parse(saved) : fallbackItems);
  }, []);
 const filteredItems = selectedCategory && selectedCategory !== 'All'
    ? items.filter(item => item.category === selectedCategory)
    : items;
return (
    <div className="food-grid">
      {filteredItems.map(item => (
        <div className="food-card" key={item.id}>
          {item.img
            ? <img className="food-img" src={item.img} alt={item.name} style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', marginBottom: 8 }} />
            : <div className="food-img" style={{ fontSize: 48, marginBottom: 8 }}>🍔</div>
          }
          <h3>{item.name}</h3>
          <p>${item.price.toFixed(2)}</p>
          <button onClick={() => onAdd(item)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default FoodGrid;