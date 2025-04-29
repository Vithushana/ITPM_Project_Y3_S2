import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';

import "./SiderChatBot.css";
import logo from '../images/logo.png';

// Icons
const Logo = styled.img`
  margin-left: 30px;
  width: 140px; 
  height: auto; 
`;
const ChatIcon = () => <span>💬</span>;
const FeedbackIcon = () => <span>📢</span>;
const SavesIcon = () => <span>🔖</span>;
const FavIcon = () => <span>❤️</span>;
// const LoadingIcon = () => <span>🔄</span>;
const FavoriteIcon = ({ isFavorite, onClick }) => (
  <span
    style={{ cursor: "pointer", marginLeft: "8px" }}
    onClick={onClick}
  >
    {isFavorite ? "❤️" : "🤍"}
  </span>
);
const HistoryIcon = () => <span>⏳</span>;
const LogoutIcon = () => <span>🚪</span>;
const MicIcon = () => <span>🎤</span>;
const SendIcon = () => <span>📩</span>;

const API_KEYWORDS = ["budget", "electronics", "inventory", "medicine", "reminders"];

const SiderChatBot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Chat Generator");

  const [chatHistory, setChatHistory] = useState([]);
  const [isHistoryView, setIsHistoryView] = useState(false);
  const [isFavoriteView, setIsFavoriteView] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const recog = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      setRecognition(recog);
    }
  }, []);

  const fetchChatHistory = useCallback(() => {
    fetch("http://localhost:8080/api/chat-history")
      .then((res) => res.json())
      .then((data) => {
        setChatHistory(data);
      })
      .catch((err) => {
        console.error("Error fetching history:", err);
      });
  }, []);

  useEffect(() => {
    if (activeMenu === "History" || activeMenu === "Favorite") {
      fetchChatHistory();
      setSelectedHistoryId(null); // Reset selection when viewing history or favorites
    }
  }, [activeMenu, fetchChatHistory]);

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
      })
  };

  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  const handleNavigate = (page) => {
    if (page === "Feedback") {
      navigate("/feedback");
    } else if (page === "FoodRecipe") {
      navigate("/FoodRecipe");
    } else if (page === "Home") {
      navigate("/home");
    }
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setIsHistoryView(menu === "History");
    setIsFavoriteView(menu === "Favorite");
    setSelectedHistoryId(null); // Reset selected history when changing menu
    if (menu === "Feedback" || menu === "FoodRecipe" || menu === "Back Home") {
      handleNavigate(menu);
    }
  };

  const handleFavoriteClick = (id, currentFavorite) => {

    fetch(`http://localhost:8080/api/chat-history/${id}?favorite=${!currentFavorite}`, {
      method: "PUT",
    })
      .then((response) => {
        if (response.ok) {
          setChatHistory((prevHistory) =>
            prevHistory.map((item) =>
              item.id === id ? { ...item, favorite: !currentFavorite } : item
            )
          );
        } else {
          console.error("Failed to update favorite status");
        }
      })
      .catch((error) => {
        console.error("Error updating favorite status:", error);
      })
  };

  const handleHistoryItemClick = (id) => {
    setSelectedHistoryId(selectedHistoryId === id ? null : id); // Toggle selection
  };

  useEffect(() => {
    if (location.pathname === "/feedback") {
      setActiveMenu("Feedback");
    } else if (location.pathname === "/FoodRecipe") {
      setActiveMenu("My Recipe");
    } else if (location.pathname === "/home") {
      setActiveMenu("Back Home");
    } else {
      setActiveMenu("Chat Generator");
    }
  }, [location.pathname]);

  const renderHistoryItem = (historyItem) => (
    <div
      key={historyItem.id}
      className={`message history-item ${selectedHistoryId === historyItem.id ? "selected" : ""}`}
      onClick={() => handleHistoryItemClick(historyItem.id)}
    >
      <span>{historyItem.sentence}</span>
      <FavoriteIcon
        isFavorite={historyItem.favorite}
        onClick={(e) => {
          e.stopPropagation();
          handleFavoriteClick(historyItem.id, historyItem.favorite);
        }}
      />
      {/* {isLoading && <LoadingIcon/>} */}
      {selectedHistoryId === historyItem.id && (
        <div className="history-details">
          <p><strong>Asked Question:</strong> {historyItem.sentence}</p>
          <p><strong>Generated Query:</strong> {historyItem.query}</p>
          {historyItem.response && historyItem.response.length > 0 ? (
            <div>
              <strong>Response:</strong>
              <ul>
                {historyItem.response.map((item) => (
                  <li key={item.id}>
                    {item.name && <p><strong>Name:</strong> {item.name}</p>}
                    {item.category && <p><strong>Category:</strong> {item.category}</p>}
                    {item.quantity !== undefined && <p><strong>Quantity:</strong> {item.quantity}</p>}
                    {item.expirationDate && <p><strong>Expiration Date:</strong> {item.expirationDate}</p>}
                    {item.illnessType && <p><strong>Illness Type:</strong> {item.illnessType}</p>}
                    {item.available !== undefined && <p><strong>Available:</strong> {item.available ? "Yes" : "No"}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p><strong>Response:</strong> No response</p>
          )}
        </div>
      )}
    </div>
  );

  const renderFavoriteItem = (favoriteItem) => (
    <div
      key={favoriteItem.id}
      className={`message history-item ${selectedHistoryId === favoriteItem.id ? "selected" : ""}`}
      onClick={() => handleHistoryItemClick(favoriteItem.id)}
    >
      <span>{favoriteItem.sentence}</span>
      <FavoriteIcon
        isFavorite={favoriteItem.favorite}
        onClick={(e) => {
          e.stopPropagation(); // Prevent click from toggling details in favorite view
          handleFavoriteClick(favoriteItem.id, favoriteItem.favorite);
        }}
      />
      {selectedHistoryId === favoriteItem.id && (
        <div className="history-details">
          <p><strong>Full Sentence:</strong> {favoriteItem.sentence}</p>
          <p><strong>Generated Query:</strong> {favoriteItem.query}</p>
          {favoriteItem.response && favoriteItem.response.length > 0 ? (
            <div>
              <strong>Response:</strong>
              <ul>
                {favoriteItem.response.map((item) => (
                  <li key={item.id}>
                    {item.name && <p><strong>Name:</strong> {item.name}</p>}
                    {item.category && <p><strong>Category:</strong> {item.category}</p>}
                    {item.quantity !== undefined && <p><strong>Quantity:</strong> {item.quantity}</p>}
                    {item.expirationDate && <p><strong>Expiration Date:</strong> {item.expirationDate}</p>}
                    {item.illnessType && <p><strong>Illness Type:</strong> {item.illnessType}</p>}
                    {item.available !== undefined && <p><strong>Available:</strong> {item.available ? "Yes" : "No"}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p><strong>Response:</strong> No response</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="chat-container">
      <div className="sider-chatbot">
        <ul className="sider-chatbot-menu">
        <Logo src={logo} alt="Logo" />
          <li
            className={`menu-item ${activeMenu === "Chat Generator" ? "active" : ""}`}
            onClick={() => handleMenuClick("Chat Generator")}
          >
            <ChatIcon /> <span>Chat Generator</span>
          </li>

          <li
            className={`menu-item ${activeMenu === "Favorite" ? "active" : ""}`}
            onClick={() => handleMenuClick("Favorite")}
          >
            <FavIcon /> <span>Favorite</span>
          </li>

          <li
            className={`menu-item ${activeMenu === "History" ? "active" : ""}`}
            onClick={() => handleMenuClick("History")}
          >
            <HistoryIcon /> <span>History</span>
          </li>

          <li
            className={`menu-item ${activeMenu === "Feedback" ? "active" : ""}`}
            onClick={() => handleNavigate("Feedback")}
          >
            <FeedbackIcon /> <span>Feedback</span>
          </li>

          <li
            className={`menu-item ${activeMenu === "My Recipe" ? "active" : ""}`}
            onClick={() => handleNavigate("FoodRecipe")}
          >
            <SavesIcon /> <span>My Recipe</span>
          </li>

          <li
            className={`menu-item ${activeMenu === "Back Home" ? "active" : ""}`}
            onClick={() => handleNavigate("Home")}
          >
            <LogoutIcon /> <span>Back Home</span>
          </li>
        </ul>

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

      <div className="chat-box">
        <h3>
          {isHistoryView
            ? "History Messages"
            : isFavoriteView
            ? "Favorite Messages"
            : "Chat Messages"}
        </h3>
        <div className="chat-messages">
          {(() => {
            let displayMessages = [];
            if (isHistoryView) {
              displayMessages = chatHistory;
            } else if (isFavoriteView) {
              displayMessages = chatHistory.filter((msg) => msg.favorite);
            } else {
              displayMessages = messages;
            }

            return displayMessages.length > 0 ? (
              displayMessages.map((msg, index) => {
                if (isHistoryView) {
                  return renderHistoryItem(msg);
                } else if (isFavoriteView) {
                  return renderFavoriteItem(msg);
                } else {
                  return (
                    <div
                      key={index}
                      className={`message ${msg.sender === "User" ? "user-message" : "bot-message"}`}
                    >
                      <span>{msg.text || msg.sentence}</span>
                    </div>
                  );
                }
              })
            ) : (
              <p className="no-messages">No messages yet...</p>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default SiderChatBot;