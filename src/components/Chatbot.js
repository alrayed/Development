import React, { useState, useRef } from "react";
const USER_ID = "user_" + Math.random().toString(36).slice(2, 10);
const N8N_WEBHOOK_URL = "https://raymon5656.app.n8n.cloud/webhook-test/n8n"; // Replace with your n8n webhook

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: input, sessionId: USER_ID })
  });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: data.reply || "Sorry, no response." }
      ]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Error connecting to server." }
      ]);
    }
  };
  React.useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  return (
    <>
      <div
        className="chatbot-float-btn"
        onClick={() => setOpen((v) => !v)}
        title="Chat with us"
      >
        💬
      </div>
      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>Chatbot</span>
            <button className="chatbot-close" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbot-msg ${msg.from === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chatbot-input-row">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;