import React, { useState } from "react";
import "../styles/alert.css";

const ReminderContainer = ({ category, className }) => {
  const [name, setName] = useState("");
  const [purchasingDate, setPurchasingDate] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminders, setReminders] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);

  const handleAddReminder = () => {
    if (!name || (category === "Electronics" && !purchasingDate) || (category !== "Electronics" && !reminderDate)) {
      alert("Please enter all required details before adding a reminder.");
      return;
    }

    const newReminder = { name, emailSent: false };
    
    if (category === "Electronics") {
      newReminder.purchasingDate = purchasingDate;
    } else {
      newReminder.reminderDate = reminderDate;
    }

    setReminders([...reminders, newReminder]);
    setName("");
    setPurchasingDate("");
    setReminderDate("");
  };

  const handleSendEmail = () => {
    if (!reminders.length) {
      alert("No reminders to send an email.");
      return;
    }

    setSentEmails([...sentEmails, ...reminders.map((r) => r.name)]);
    setReminders((prevReminders) =>
      prevReminders.map((reminder) => ({ ...reminder, emailSent: true }))
    );

    alert(
      `Email sent for ${category} reminders:\n` +
        reminders
          .map((r) =>
            category === "Electronics"
              ? `${r.name} - Purchasing Date: ${r.purchasingDate}`
              : `${r.name} - Reminder Date: ${r.reminderDate}`
          )
          .join("\n")
    );
  };

  return (
    <div className={`reminder-container ${className}`}>
      <h3>{category}</h3>
      <label>Name:</label>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {category === "Electronics" ? (
        <>
          <label>Purchasing Date:</label>
          <input
            type="date"
            value={purchasingDate}
            onChange={(e) => setPurchasingDate(e.target.value)}
          />
        </>
      ) : category !== "Status" ? (
        <>
          <label>Reminder Date:</label>
          <input
            type="date"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
          />
        </>
      ) : null}

      {category !== "Status" && (
        <>
          <button onClick={handleAddReminder}>Add</button>
          <button onClick={handleSendEmail}>Send Email</button>
        </>
      )}

      <ul className="reminder-list">
        {reminders.map((reminder, index) => (
          <li key={index}>
            {reminder.name} -{" "}
            {category === "Electronics"
              ? `Purchasing Date: ${reminder.purchasingDate}`
              : `Reminder Date: ${reminder.reminderDate}`}
            {category === "Status" && (
              <span style={{ color: reminder.emailSent ? "green" : "red", marginLeft: "10px" }}>
                {reminder.emailSent ? "Email Sent ✅" : "Email Not Sent ❌"}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AlertPage = () => {
  return (
    <div className="alert-reminder-page">
      <h2>Alert Reminder Page</h2>
      <div className="reminders-grid">
        <ReminderContainer category="Electronics" className="electronics" />
        <ReminderContainer category="Medicine" className="medicine" />
        <ReminderContainer category="Groceries" className="groceries" />
        <ReminderContainer category="Status" className="status" />
      </div>
    </div>
  );
};

export default AlertPage;
