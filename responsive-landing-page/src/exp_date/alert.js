import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import "../styles/alert.css";

const ReminderContainer = ({ category, className }) => {
  const [name, setName] = useState("");
  const [purchasingDate, setPurchasingDate] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminders, setReminders] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [notification, setNotification] = useState("");

  const handleAddReminder = async () => {
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

    try {
      const response = await fetch('http://localhost:8080/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newReminder.name,
          purchasingDate: newReminder.purchasingDate,
          reminderDate: newReminder.reminderDate,
          emailSent: newReminder.emailSent,
          category: category.toUpperCase(),
        }),
      });

      if (response.ok) {
        setReminders([...reminders, newReminder]);
        setName("");
        setPurchasingDate("");
        setReminderDate("");
        setNotification(`Reminder "${name}" added successfully.`);
      } else {
        setNotification("Failed to add reminder.");
      }
    } catch (error) {
      console.error('Error adding reminder:', error);
      setNotification("Failed to add reminder.");
    }
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
          {notification && <p className="notification">{notification}</p>}
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

const SwipeableReminderContainer = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/reminders', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setReminders(data);
        } else {
          console.error('Failed to fetch reminders');
        }
      } catch (error) {
        console.error('Error fetching reminders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="swipeableviews">
    <SwipeableViews enableMouseEvents>
      {reminders.map((reminder, index) => (
        <div key={reminder.id} style={{ padding: 20 }}>
          <h3>{reminder.name}</h3>
          <p>Category: {reminder.category}</p>
          {reminder.purchasingDate && <p>Purchasing Date: {reminder.purchasingDate}</p>}
          {reminder.reminderDate && <p>Reminder Date: {reminder.reminderDate}</p>}
          <p>Email Sent: {reminder.emailSent ? "Yes" : "No"}</p>
          <button className="edit-btn">Edit</button>
          <button className="delete-btn">Delete</button>
        </div>
      ))}
    </SwipeableViews>
    </div>
  );
};

const AlertPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/home"); 
  };

  return (
    <div className="alert-reminder-page">
      <h2>Alert Reminder Page</h2>
      <div className="search">
          <input
            type="text"
            placeholder="Search Reminder..."
            className="search-bar"
            />
        </div>
      <div className="reminders-grid">
        <ReminderContainer category="Electronics" className="electronics" />
        <ReminderContainer category="Medicine" className="medicine" />
        <ReminderContainer category="Groceries" className="groceries" />
      </div>
      <div className="swipeable-container">
        <SwipeableReminderContainer />
      </div>
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#000",
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
        onClick={handleGoBack}
      >
        <FaArrowLeft size={32} color="#000" />
        <span>Back Home</span>
      </div>
    </div>
  );
};

export default AlertPage;