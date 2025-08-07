import React, { useState, useEffect } from "react";
const Account = ({ onLogout }) => {
  const stored = JSON.parse(localStorage.getItem("user") || "{}");
  const [name, setName] = useState(stored.name || "");
  const [number, setNumber] = useState(stored.number || "");
  const [address, setAddress] = useState(stored.address || "");
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify({ ...stored, name, number, address }));
    setEditing(false);
  };
  const [orders, setOrders] = useState(() => {
  const all = JSON.parse(localStorage.getItem("orders") || "[]");
  return all.filter(o => o.user?.email === stored.email);
});

useEffect(() => {
  const interval = setInterval(() => {
    const all = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(all.filter(o => o.user?.email === stored.email));
  }, 1000);
  return () => clearInterval(interval);
}, [stored.email]);

  return (
    <div className="account-page" style={{ maxWidth: 340, margin: "4rem auto", background: "#fffbe7", borderRadius: 12, padding: 24 }}>
      <h2>Account</h2>
      <div><b>Email:</b> {stored.email}</div>
      <div>
        <b>Name:</b>{" "}
        {editing ? (
          <input value={name} onChange={e => setName(e.target.value)} />
        ) : (
          name
        )}
      </div>
      
      <div>
        <b>Mobile:</b>{" "}
        {editing ? (
          <input value={number} onChange={e => setNumber(e.target.value)} />
        ) : (
          number
        )}
      </div>
      
      <div>
        <b>Address:</b>{" "}
        {editing ? (
          <input value={address} onChange={e => setAddress(e.target.value)} />
        ) : (
          address
        )}
      </div>
      <div style={{ marginTop: 32 }}>
  <h3>Your Orders</h3>
  {orders.length === 0 ? (
    <div>No orders yet.</div>
  ) : (
    <ul>
      {orders.map(order => (
        <li key={order.id} style={{ marginBottom: 12 }}>
          {order.date}<br />
          {order.items.map(item => (
            <span key={item.id}>{item.name} x {item.qty} &nbsp;</span>
          ))}
        </li>
      ))}
    </ul>
  )}
</div>
      {editing ? (
        <button onClick={handleSave} style={{ marginTop: 12 }}>Save</button>
      ) : (
        <button onClick={() => setEditing(true)} style={{ marginTop: 12 }}>Edit</button>
      )}
      <button onClick={onLogout} style={{ marginTop: 12, marginLeft: 8 }}>Logout</button>
    </div>
  );
};

export default Account;