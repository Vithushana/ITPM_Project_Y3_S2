import React, { useState } from "react";
import "../styles/alert.css";

// Renamed alertPage to AlertPage (React component naming convention)
const AlertPage = () => {
  const [neverExpire, setNeverExpire] = useState(false);
  const [sendReminders, setSendReminders] = useState(true);
  const [firstReminder, setFirstReminder] = useState(0);
  const [secondReminder, setSecondReminder] = useState(0);
  const [thirdReminder, setThirdReminder] = useState(0);
  const [condition, setCondition] = useState("Always");
  const [selectedDate, setSelectedDate] = useState(null);
  const [status] = useState("Approved");
  const [expirationDate, setExpirationDate] = useState("");

  const handleDateSelect = (day) => {
    setSelectedDate(day);
    setExpirationDate(`2023-07-${String(day).padStart(2, "0")} 09:35`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      neverExpire,
      sendReminders,
      firstReminder,
      secondReminder,
      thirdReminder,
      condition,
      expirationDate,
    });
  };

  const daysInMonth = new Date(2023, 6, 0).getDate(); // July 2023
  const firstDayOfMonth = new Date(2023, 6, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="empty"></div>);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(
      <div
        key={i}
        className={`day ${selectedDate === i ? "selected" : ""}`}
        onClick={() => handleDateSelect(i)}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Expiry & Reminders</h1>

      {/* Expiration Status */}
      <div className="status">
        <h2>Status: {status}</h2>
        <p>Expiration Date: {expirationDate}</p>
      </div>

      {/* Reminder Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="checkbox"
              checked={neverExpire}
              onChange={(e) => setNeverExpire(e.target.checked)}
            />
            Never Expire
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={sendReminders}
              onChange={(e) => setSendReminders(e.target.checked)}
            />
            Send Reminder(s)
          </label>
        </div>
        <div>
          <label>
            First reminder:
            <input
              type="number"
              value={firstReminder}
              onChange={(e) => setFirstReminder(parseInt(e.target.value))}
            />
            day(s) before
          </label>
        </div>
        <div>
          <label>
            Second reminder:
            <input
              type="number"
              value={secondReminder}
              onChange={(e) => setSecondReminder(parseInt(e.target.value))}
            />
            day(s) before
          </label>
        </div>
        <div>
          <label>
            Third reminder:
            <input
              type="number"
              value={thirdReminder}
              onChange={(e) => setThirdReminder(parseInt(e.target.value))}
            />
            day(s) before
          </label>
        </div>
        <div>
          <label>
            Only if:
            <select value={condition} onChange={(e) => setCondition(e.target.value)}>
              <option value="Always">Always</option>
              <option value="Not opened">Not opened</option>
              <option value="Not commented">Not commented</option>
              <option value="Not actioned">Not actioned</option>
            </select>
          </label>
        </div>
        <button type="submit">Create</button>
        <button type="button">Cancel</button>
      </form>

      {/* Calendar */}
      <div className="calendar">
        <div className="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="days">{days}</div>
      </div>
    </div>
  );
};

export default AlertPage;
