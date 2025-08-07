import React, { useState } from "react";

const Payment = ({ onComplete }) => {
  const [selected, setSelected] = useState("");
  const [done, setDone] = useState(false);

  const handlePay = () => {
    setDone(true);
    setTimeout(() => {
      onComplete();
    }, 2000); // auto-close after 2 seconds
  };

  if (done) {
    return (
      <div className="payment-page" style={{ textAlign: "center", marginTop: 60 }}>
        <h2 style={{ color: "#e67c00" }}>Order Complete!</h2>
        <p>Thank you for your order.</p>
      </div>
    );
  }

  return (
    <div className="payment-page" style={{ maxWidth: 340, margin: "4rem auto", background: "#fffbe7", borderRadius: 12, padding: 24 }}>
      <h2 style={{ color: "#e67c00" }}>Choose Payment Method</h2>
      <div style={{ margin: "2rem 0" }}>
        <label style={{ display: "block", marginBottom: 12 }}>
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={selected === "cash"}
            onChange={() => setSelected("cash")}
          />{" "}
          Cash on Delivery
        </label>
        <label style={{ display: "block", marginBottom: 12 }}>
          <input
            type="radio"
            name="payment"
            value="bkash"
            checked={selected === "bkash"}
            onChange={() => setSelected("bkash")}
          />{" "}
          bKash
        </label>
        <label style={{ display: "block", marginBottom: 12 }}>
          <input
            type="radio"
            name="payment"
            value="nogod"
            checked={selected === "nogod"}
            onChange={() => setSelected("nogod")}
          />{" "}
          Nagad
        </label>
      </div>
      <button
        style={{ width: "100%", background: "#ff9800", color: "#fff", border: "none", borderRadius: 8, padding: "0.7rem", fontWeight: "bold", fontSize: "1.1rem" }}
        disabled={!selected}
        onClick={handlePay}
      >
        Complete Order
      </button>
    </div>
  );
};

export default Payment;