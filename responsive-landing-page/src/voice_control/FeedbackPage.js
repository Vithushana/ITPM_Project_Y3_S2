import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FeedbackPage.css'; // Import your CSS file

const FeedbackPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.warning("Please fill all fields!");
      return;
    }

    console.log({ name, email, message });
    toast.success("Thank you for your feedback!");

    // Reset fields
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleBack = () => {
    navigate('/sidechatbot');
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
