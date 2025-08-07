import React, { useState } from "react";

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