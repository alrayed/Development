import React from "react";

const About = () => (
  <div className="about-page" style={{ maxWidth: 600, margin: "3rem auto", background: "#fffbe7", borderRadius: 12, padding: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
    <h2 style={{ color: "#e67c00", marginBottom: 24 }}>About Burgers TNC</h2>
    <h3>📍 Store Location</h3>
    <p>
      123 Burger Lane,<br />
      Foodie City, 456789<br />
      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ color: "#e67c00" }}>View on Google Maps</a>
    </p>
    <h3 style={{ marginTop: 32 }}>🌐 Connect with us</h3>
    <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#4267B2", fontSize: 24 }}>Facebook</a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#E1306C", fontSize: 24 }}>Instagram</a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "#1DA1F2", fontSize: 24 }}>Twitter</a>
    </div>
    <h3 style={{ marginTop: 32 }}>🏆 Our Success Story</h3>
    <p>
      In 2022, Burgers TNC started as a small food stall with a big dream: to serve the juiciest, most delicious burgers in town. Within a year, our passion for quality and flavor turned us into the city's favorite burger spot!<br /><br />
      Today, we serve thousands of happy customers every month and have become a local legend for our secret sauce and friendly service. Join us and be part of our tasty journey!
    </p>
  </div>
);

export default About;