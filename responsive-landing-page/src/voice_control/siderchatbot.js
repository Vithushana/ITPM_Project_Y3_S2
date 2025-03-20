import React from 'react';
import '../voice_control/SiderChatBot.css';

const ChatIcon = () => <span>💬</span>;
const FeedbackIcon = () => <span>📢</span>;
const PromptLibraryIcon = () => <span>📚</span>;
const SavesIcon = () => <span>🔖</span>;
const FavoriteIcon = () => <span>❤️</span>;
const HistoryIcon = () => <span>⏳</span>;
const StatisticsIcon = () => <span>📊</span>;
const SettingsIcon = () => <span>⚙️</span>;
const LogoutIcon = () => <span>🚪</span>;

const SiderChatBot = () => {
  return (
    <div className="sider-chatbot">
      <div className="sider-chatbot-header">
        <div className="dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <h2>CHAT BOT</h2>
      </div>
      <ul className="sider-chatbot-menu">
        <li className="menu-item active">
          <ChatIcon />
          <span>Chat Generator</span>
        </li>
        <li className="menu-item">
          <FeedbackIcon />
          <span>Feedback</span>
        </li>
        <li className="menu-item">
          <PromptLibraryIcon />
          <span>Prompt Library</span>
        </li>
        <li className="menu-item">
          <SavesIcon />
          <span>My Saves</span>
        </li>
        <li className="menu-item">
          <FavoriteIcon />
          <span>Favorite</span>
        </li>
        <li className="menu-item">
          <HistoryIcon />
          <span>History</span>
        </li>
        <li className="menu-item">
          <StatisticsIcon />
          <span>Statistics</span>
        </li>
        <li className="menu-item">
          <SettingsIcon />
          <span>Settings</span>
        </li>
        <li className="menu-item">
          <LogoutIcon />
          <span>Log Out</span>
        </li>
      </ul>
      <div className="user-profile">
        <div className="avatar"></div>
        <div className="user-info">
          <p className="user-name">Adam Williams</p>
          <p className="user-email">info@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default SiderChatBot;