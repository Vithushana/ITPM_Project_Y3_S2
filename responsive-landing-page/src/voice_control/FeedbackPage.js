import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // ✅ Import Axios
import './FeedbackPage.css'; // Import your CSS

const FeedbackPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.warning("Please fill all fields!");
      return;
    }

    try {
      // ✅ Send feedback to backend
      await axios.post('http://localhost:8080/api/feedbacks', {
        name,
        email,
        message,
      });

      toast.success("Thank you for your feedback!");

      // Reset fields
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again!');
    }
  };

  const handleBack = () => {
    navigate('/SiderChatBot');
  };

  return (
    <div className="feedback-page">
      <h1 className="feedback-title">Feedback</h1>
      <p className="feedback-subtitle">We would love to hear your thoughts!</p>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="feedback-input"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="feedback-input"
        />
        <textarea
          placeholder="Your Feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="feedback-textarea"
        />
        <button type="submit" className="feedback-submit-button">
          Submit Feedback
        </button>
      </form>

      <button onClick={handleBack} className="feedback-back-button">
        Back to ChatBot
      </button>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} pauseOnHover />
    </div>
  );
};

export default FeedbackPage;
