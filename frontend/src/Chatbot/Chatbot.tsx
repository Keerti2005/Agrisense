import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import "../Chatbot/Chatbot.css";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSendMessage = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    try {
      const res = await axios.post("http://139.84.142.129:5100/chatbot", {
        prompt: input,
      });

      const botMessage: Message = {
        text: res.data.text
          .split("\n")
          .map((paragraph: string) => paragraph.replace(/\*/g, ""))
          .join("\n"),
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);

      const errorMessage: Message = {
        text: "Sorry, there was an error processing your request.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInput("");
  };

  return (
    <div>
      <Navbar />
      <div className="crop6">
        <div className="crop7">
          <h1>Chatbot</h1>
          <p>Clear your queries here</p>
        </div>
      </div>

      <div className="chatbot1">
        <div className="chatbot-container">
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default Chatbot;