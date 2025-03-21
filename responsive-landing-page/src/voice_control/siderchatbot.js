import React, { useEffect, useState } from "react";

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
          const itemNames = data.map((item) => item.name ? item.name : item.category);
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
    <div style={styles.chatContainer}>
      {/* Sidebar */}
      <div style={styles.siderChatbot}>
        {/* Header */}
        <div style={styles.siderChatbotHeader}>
          <h2>CHAT BOT</h2>
        </div>

        {/* Menu Items */}
        <ul style={styles.siderChatbotMenu}>
          <li style={styles.menuItem}>
            <ChatIcon /> <span>Chat Generator</span>
          </li>
          <li style={styles.menuItem}>
            <FeedbackIcon /> <span>Feedback</span>
          </li>
          <li style={styles.menuItem}>
            <SavesIcon /> <span>My Saves</span>
          </li>
          <li style={styles.menuItem}>
            <FavoriteIcon /> <span>Favorite</span>
          </li>
          <li style={styles.menuItem}>
            <HistoryIcon /> <span>History</span>
          </li>
          <li style={styles.menuItem}>
            <LogoutIcon /> <span>Back Home</span>
          </li>
        </ul>

        {/* Voice Assistant Section */}
        <div style={styles.voiceAssist}>
          <h3>Voice Assistant</h3>
          <button
            style={isListening ? { ...styles.micButton, background: "red" } : styles.micButton}
            onClick={toggleListening}
          >
            <MicIcon /> {isListening ? "Listening..." : "Start Voice"}
          </button>
          <p style={styles.transcript}>{transcript || "Say something..."}</p>
          <button style={styles.finishButton} onClick={finishChat}>
            <SendIcon /> Finish Chat
          </button>
        </div>
      </div>

      {/* Chat Display */}
      <div style={styles.chatBox}>
        <h3>Chat Messages</h3>
        <div style={styles.chatMessages}>
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(msg.sender === "User" ? styles.userMessage : styles.botMessage),
                }}
              >
                <span>{msg.text}</span>
              </div>
            ))
          ) : (
            <p style={styles.noMessages}>No messages yet...</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  chatContainer: {
    display: "flex",
    height: "100vh",
  },
  siderChatbot: {
    width: "300px",
    background: "#282c34",
    color: "white",
    padding: "20px",
    borderRight: "2px solid #444",
    display: "flex",
    flexDirection: "column",
  },
  siderChatbotHeader: {
    textAlign: "center",
    marginBottom: "20px",
  },
  siderChatbotMenu: {
    listStyle: "none",
    padding: "0",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    cursor: "pointer",
  },
  voiceAssist: {
    marginTop: "auto",
    padding: "15px",
    border: "1px solid #555",
    borderRadius: "8px",
    textAlign: "center",
    background: "#333",
  },
  micButton: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  finishButton: {
    background: "green",
    color: "white",
    border: "none",
    padding: "10px",
    marginTop: "10px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  transcript: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#ddd",
  },
  chatBox: {
    flexGrow: "1",
    background: "#f4f4f4",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  chatMessages: {
    flexGrow: "1",
    overflowY: "auto",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "white",
    display: "flex",
    flexDirection: "column",
  },
  message: {
    padding: "10px",
    borderRadius: "5px",
    margin: "5px",
    maxWidth: "70%",
  },
  userMessage: {
    background: "#007bff",
    color: "white",
    alignSelf: "flex-end",
  },
  botMessage: {
    background: "#444",
    color: "white",
    alignSelf: "flex-start",
  },
  noMessages: {
    color: "#666",
    textAlign: "center",
    padding: "20px",
  },
};


export default SiderChatBot;
