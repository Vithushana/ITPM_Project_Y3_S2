import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SiderChatBot.css";

// Icons
const ChatIcon = () => <span>💬</span>;
const FeedbackIcon = () => <span>📢</span>;
const SavesIcon = () => <span>🔖</span>;
const FavoriteIcon = () => <span>❤️</span>;
const HistoryIcon = () => <span>⏳</span>;
const LogoutIcon = () => <span>🚪</span>;
const MicIcon = () => <span>🎤</span>;
const SendIcon = () => <span>📩</span>;

const API_KEYWORDS = ["budget", "electronics", "inventory", "medicine", "reminders"];

const SiderChatBot = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([]);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const recog = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      setRecognition(recog);
    }
  }, []);

  useEffect(() => {
    if (!recognition) return;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((result) => result[0].transcript.toLowerCase())
        .join("");
      setTranscript(text);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognition) {
        recognition.onresult = null;
        recognition.onend = null;
        recognition.stop();
      }
    };
  }, [recognition]);

  const toggleListening = () => {
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const finishChat = () => {
    if (!recognition) return;

    recognition.stop();
    setIsListening(false);

    if (transcript.trim()) {
      addMessage(transcript, "User");
      const detectedKeyword = API_KEYWORDS.find((keyword) => transcript.includes(keyword));
      fetchData(transcript, detectedKeyword);
    }

    setTranscript("");
  };

  const fetchData = (transcript, category) => {
    fetch("http://localhost:8080/nlp-query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sentence: transcript }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          const itemNames = data.map((item) => item.name || item.category);
          addMessage(`Items in ${category}:`, "Bot");
          itemNames.forEach((name) => addMessage(name, "Bot"));
        } else {
          addMessage(`No items found for ${category}`, "Bot");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        addMessage("Error fetching data. Please try again.", "Bot");
      });
  };

  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  const handleNavigate = (page) => {
    if (page === "Feedback") {
      navigate("/feedback");
    }
    if (page === "FoodRecipe") {
      navigate("/FoodRecipe");
    }
    if (page === "Home") {
      navigate("/home");
    }
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="sider-chatbot">
        <div className="sider-chatbot-header">
          <h2>CHAT BOT</h2>
        </div>

        {/* Menu Items */}
        <ul className="sider-chatbot-menu">
          <li className="menu-item">
            <ChatIcon /> <span>Chat Generator</span>
          </li>

          <li className="menu-item" onClick={() => handleNavigate("Feedback")}>
            <FeedbackIcon /> <span>Feedback</span>
          </li>

          <li className="menu-item" onClick={() => handleNavigate("FoodRecipe")}>
            <SavesIcon /> <span>My Recipe</span>
          </li>

          <li className="menu-item">
            <FavoriteIcon /> <span>Favorite</span>
          </li>

          <li className="menu-item">
            <HistoryIcon /> <span>History</span>
          </li>

          <li className="menu-item" onClick={() => handleNavigate("Home")}>
            <LogoutIcon /> <span>Back Home</span>
          </li>
        </ul>

        {/* Voice Assistant */}
        <div className="voice-assist">
          <h3>Voice Assistant</h3>
          <button
            className={`mic-button ${isListening ? "listening" : ""}`}
            onClick={toggleListening}
          >
            <MicIcon /> {isListening ? "Listening..." : "Start Voice"}
          </button>
          <p className="transcript">{transcript || "Say something..."}</p>
          <button className="finish-button" onClick={finishChat}>
            <SendIcon /> Finish Chat
          </button>
        </div>
      </div>

      {/* Chat Display */}
      <div className="chat-box">
        <h3>Chat Messages</h3>
        <div className="chat-messages">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === "User" ? "user-message" : "bot-message"}`}>
                <span>{msg.text}</span>
              </div>
            ))
          ) : (
            <p className="no-messages">No messages yet...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiderChatBot;
