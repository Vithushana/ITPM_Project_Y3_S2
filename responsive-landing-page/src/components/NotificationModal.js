import React from "react";
import "./NotificationModal.css";

const NotificationModal = ({ show, onClose, reminders }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Notifications</h3>
        {reminders.length === 0 ? (
          <p>No reminders found.</p>
        ) : (
          <ul>
            {reminders.map((r, index) => (
              <li key={index}>
                🔔 {r.name} ({r.category}) —{" "}
                {r.reminderDate || r.purchasingDate || "No date"}
              </li>
            ))}
          </ul>
        )}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default NotificationModal;
