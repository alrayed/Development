import React, { useState, useEffect } from 'react';

const initialItems = [
  { id: 1, name: 'Classic Burger', price: 5.99, img: '' },
  { id: 2, name: 'Cheese Burger', price: 6.99, img: '' },
];

const LOCAL_KEY = 'admin_items';
const ADMIN_ID = 'admin';
const ADMIN_PASS = '1234';

const AdminPanel = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : initialItems;
  });
  const [newItem, setNewItem] = useState({ name: '', price: '', img: '', category: '' });

  // Login state
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  }, [items]);

  const handleAdd = () => {
    if (!newItem.name || !newItem.price) return;
    setItems([
      ...items,
      {
        id: Date.now(),
        name: newItem.name,
        price: parseFloat(newItem.price),
        img: newItem.img,
      },
    ]);
    setNewItem({ name: '', price: '', img: '' });
  };

  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setNewItem({ ...newItem, img: ev.target.result });
    reader.readAsDataURL(file);
  };

  const handleLogin = () => {
    if (id === ADMIN_ID && pass === ADMIN_PASS) {
      setLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid ID or password');
    }
  };

  if (!loggedIn) {
    return (
      <div className="admin-login" style={{ maxWidth: 320, margin: "5rem auto", padding: 24, background: "#fffbe7", borderRadius: 12 }}>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Admin ID"
          value={id}
          onChange={e => setId(e.target.value)}
          style={{ marginBottom: 12, width: "100%", padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          style={{ marginBottom: 12, width: "100%", padding: 8 }}
        />
        <button
          onClick={handleLogin}
          style={{ width: "100%", padding: 8, background: "#ff9800", color: "#fff", border: "none", borderRadius: 6 }}
        >
          Login
        </button>
        {loginError && <div style={{ color: "red", marginTop: 8 }}>{loginError}</div>}
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="admin-add">
  <input
    type="text"
    placeholder="Item name"
    value={newItem.name}
    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
  />
  <input
    type="number"
    placeholder="Price"
    value={newItem.price}
    onChange={e => setNewItem({ ...newItem, price: e.target.value })}
  />
  <select
    value={newItem.category}
    onChange={e => setNewItem({ ...newItem, category: e.target.value })}
  >
    <option value="">Select Category</option>
    <option value="Dessert">Dessert</option>
    <option value="Cool Drink">Cool Drink</option>
    <option value="Breakfast">Breakfast</option>
    <option value="Fast Food">Fast Food</option>
  </select>
  <input
    type="file"
    accept="image/*"
    onChange={handleImage}
  />
  <button onClick={handleAdd}>Add Item</button>
</div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item =>
            <tr key={item.id}>
              <td>
                {item.img && (
                  <img src={item.img} alt={item.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                )}
              </td>
              <td>{item.name}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;