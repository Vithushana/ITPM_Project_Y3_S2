import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/alert.css";

const ReminderContainer = ({ category, className }) => {
  const [name, setName] = useState("");
  const [purchasingDate, setPurchasingDate] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminders, setReminders] = useState([]);

  const handleAddReminder = async () => {
    if (
      !name ||
      (category === "Electronics" && !purchasingDate) ||
      (category !== "Electronics" && !reminderDate)
    ) {
      toast.warning("Please enter all required details before adding a reminder.");
      return;
    }

    const newReminder = {
      name,
      emailSent: false,
      purchasingDate: category === "Electronics" ? purchasingDate : null,
      reminderDate: category !== "Electronics" ? reminderDate : null,
      category: category.toUpperCase(),
    };

    try {
      const response = await fetch("http://localhost:8080/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReminder),
      });

      if (response.ok) {
        const savedReminder = await response.json();
        setReminders([...reminders, savedReminder]);
        setName("");
        setPurchasingDate("");
        setReminderDate("");
        toast.success(`Reminder "${name}" added successfully.`);
      } else {
        toast.error("Failed to add reminder.");
      }
    } catch (error) {
      console.error("Error adding reminder:", error);
      toast.error("Failed to add reminder.");
    }
  };

  const handleSendEmail = () => {
    if (!reminders.length) {
      toast.info("No reminders to send an email.");
      return;
    }

    const updatedReminders = reminders.map((r) => ({
      ...r,
      emailSent: true,
    }));

    setReminders(updatedReminders);

    toast.success(`Email sent for ${category} reminders.`);
  };

  return (
    <motion.div
      className={`reminder-container ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
      ) : (
        <>
          <label>Reminder Date:</label>
          <input
            type="date"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
          />
        </>
      )}
      <button onClick={handleAddReminder}>Add</button>
      <button onClick={handleSendEmail}>Send Email</button>

      <ul className="reminder-list">
        {reminders.map((reminder, index) => (
          <li key={index}>
            {reminder.name} -{" "}
            {category === "Electronics"
              ? `Purchasing Date: ${reminder.purchasingDate}`
              : `Reminder Date: ${reminder.reminderDate}`}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const ReminderCardView = ({ searchTerm, reminders, setReminders, loading }) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this reminder?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/api/reminders/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setReminders((prev) => prev.filter((r) => r.id !== id));
        toast.success("Reminder deleted.");
      } else {
        toast.error("Failed to delete reminder.");
      }
    } catch (error) {
      console.error("Error deleting reminder:", error);
      toast.error("Error deleting reminder.");
    }
  };

  const filteredReminders = reminders.filter((reminder) =>
    reminder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="reminder-card-view">
      {filteredReminders.map((reminder, index) => (
        <motion.div
          key={reminder.id || index}
          className="reminder-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <h3>{reminder.name}</h3>
          <p><strong>Category:</strong> {reminder.category}</p>
          {reminder.purchasingDate && (
            <p><strong>Purchasing Date:</strong> {reminder.purchasingDate}</p>
          )}
          {reminder.reminderDate && (
            <p><strong>Reminder Date:</strong> {reminder.reminderDate}</p>
          )}
          <p><strong>Email Sent:</strong> {reminder.emailSent ? "Yes ✅" : "No ❌"}</p>
          <div className="btn-group">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(reminder.id)}>Delete</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const AlertPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/reminders");
      if (response.ok) {
        const data = await response.json();
        setReminders(data);
      } else {
        toast.error("Failed to fetch reminders.");
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
      toast.error("Error fetching reminders.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!reminders.length) {
      toast.info("No reminders available to download.");
      return;
    }

    const csvHeader = "Name,Category,Purchasing Date,Reminder Date,Email Sent\n";
    const csvRows = reminders.map((r) =>
      [
        `"${r.name}"`,
        `"${r.category}"`,
        r.purchasingDate || "",
        r.reminderDate || "",
        r.emailSent ? "Yes" : "No"
      ].join(",")
    );
    const csvContent = csvHeader + csvRows.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "reminders_report.csv";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="alert-reminder-page">
      <h2>Alert Reminder Page</h2>
      <div className="search">
        <input
          type="text"
          placeholder="Search Reminder..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="download-report" onClick={handleDownloadReport}>
          Download Report
        </button>
      </div>

      <div className="reminders-grid">
        <ReminderContainer category="Electronics" className="electronics" />
        <ReminderContainer category="Medicine" className="medicine" />
        <ReminderContainer category="Groceries" className="groceries" />
      </div>

      <div className="cardview-container">
        <ReminderCardView
          searchTerm={searchTerm}
          reminders={reminders}
          setReminders={setReminders}
          loading={loading}
        />
      </div>

      <div className="back-button" onClick={() => navigate("/home")}>
        <FaArrowLeft size={32} />
        <span>Back Home</span>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AlertPage;
