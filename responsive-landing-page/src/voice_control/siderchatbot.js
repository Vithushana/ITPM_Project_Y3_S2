import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./SiderChatBot.css";

// Icons (using emojis as placeholders)
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
  const navigate = useNavigate(); // Initialize useNavigate
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([]);
  let recognition = null;

  if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  }

  useEffect(() => {
    document.body.classList.add("remove-bg");
    return () => {
      document.body.classList.remove("remove-bg");
    };
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
  }, []);

  const fetchData = (category) => {
    fetch(`http://localhost:8080/api/${category}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          const itemNames = data.map((item) => (item.name ? item.name : item.category));
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

      if (detectedKeyword) {
        fetchData(detectedKeyword); // Call the API after finishing the chat
      }
    }

    setTranscript("");
  };

  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="sider-chatbot">
        {/* Header */}
        <div className="sider-chatbot-header">
          <h2>CHAT BOT</h2>
        </div>

        {/* Menu Items */}
        <ul className="sider-chatbot-menu">
          <li className="menu-item">
            <ChatIcon /> <span>Chat Generator</span>
          </li>
          <li className="menu-item">
            <FeedbackIcon /> <span>Feedback</span>
          </li>
          <li className="menu-item">
            <SavesIcon /> <span>My Recipe</span>
          </li>
          <li className="menu-item">
            <FavoriteIcon /> <span>Favorite</span>
          </li>
          <li className="menu-item">
            <HistoryIcon /> <span>History</span>
          </li>
          <li className="menu-item" onClick={() => navigate("/home")}>
            <LogoutIcon /> <span>Back Home</span>
          </li>
        </ul>

        {/* Voice Assistant Section */}
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
