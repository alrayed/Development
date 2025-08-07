import React, { useState } from "react";

const DEFAULT_OTP = "1234";

const SignUp = ({ onSignup }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) return setError("Enter your email.");
    setError("");
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp !== DEFAULT_OTP) return setError("Invalid OTP. Try 1234.");
    setError("");
    setStep(3);
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!name || !number || !address) return setError("Fill all fields.");
    localStorage.setItem("user", JSON.stringify({ email, name, number, address }));
    onSignup();
  };

  return (
    <div className="signup-form" style={{ maxWidth: 340, margin: "4rem auto", background: "#fffbe7", borderRadius: 12, padding: 24 }}>
      <h2>Sign Up</h2>
      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", marginBottom: 12, padding: 8 }} />
          <button type="submit" style={{ width: "100%" }}>Send OTP</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleOtpSubmit}>
          <input type="text" placeholder="Enter OTP (1234)" value={otp} onChange={e => setOtp(e.target.value)} style={{ width: "100%", marginBottom: 12, padding: 8 }} />
          <button type="submit" style={{ width: "100%" }}>Verify OTP</button>
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handleDetailsSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ width: "100%", marginBottom: 12, padding: 8 }} />
          <input type="text" placeholder="Mobile Number" value={number} onChange={e => setNumber(e.target.value)} style={{ width: "100%", marginBottom: 12, padding: 8 }} />
          <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} style={{ width: "100%", marginBottom: 12, padding: 8 }} />
          <button type="submit" style={{ width: "100%" }}>Create Account</button>
        </form>
      )}
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </div>
  );
};

export default SignUp;