import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FaqSection.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// FAQ Component
const FAQ = ({ index, question, answer, isOpen, onClick, onEdit, onDelete }) => {
  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => onClick(index)}>
        {question}
        <span className="icon">{isOpen ? '-' : '+'}</span>
      </div>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        {answer}
        <div className="button-group">
          <button className="action-button edit" onClick={() => onEdit(index)}>Edit</button>
          <button className="action-button delete" onClick={() => onDelete(index)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

// Main Section
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [formQuestion, setFormQuestion] = useState('');
  const [formAnswer, setFormAnswer] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = () => {
    axios.get('http://localhost:8080/api/faqs')
      .then((response) => {
        setFaqData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching FAQ data:", error);
        toast.error('Failed to load FAQs');
      });
  };

  const handleFaqClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formQuestion || !formAnswer) {
      toast.warning('Please fill both fields.');
      return;
    }

    if (editId) {
      axios.put(`http://localhost:8080/api/faqs/${editId}`, {
        question: formQuestion,
        answer: formAnswer
      }).then(() => {
        loadFaqs();
        resetForm();
        toast.success('FAQ Updated Successfully!');
      }).catch(err => {
        console.error(err);
        toast.error('Failed to Update FAQ');
      });
    } else {
      axios.post('http://localhost:8080/api/faqs', {
        question: formQuestion,
        answer: formAnswer
      }).then(() => {
        loadFaqs();
        resetForm();
        toast.success('FAQ Added Successfully!');
      }).catch(err => {
        console.error(err);
        toast.error('Failed to Add FAQ');
      });
    }
  };

  const resetForm = () => {
    setFormQuestion('');
    setFormAnswer('');
    setEditId(null);
  };

  const handleEdit = (index) => {
    const faq = faqData[index];
    setFormQuestion(faq.question);
    setFormAnswer(faq.answer);
    setEditId(faq.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index) => {
    const faq = faqData[index];
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      axios.delete(`http://localhost:8080/api/faqs/${faq.id}`)
        .then(() => {
          loadFaqs();
          toast.success('FAQ Deleted Successfully!');
        })
        .catch(err => {
          console.error(err);
          toast.error('Failed to Delete FAQ');
        });
    }
  };

  return (
    <section className="section">
      <h1 className="title">
        Frequently Asked Questions<br /> about <span>HomeStock Management System</span>
      </h1>

      <form className="form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter FAQ Question"
          value={formQuestion}
          onChange={(e) => setFormQuestion(e.target.value)}
          className="input"
        />
        <textarea
          rows="4"
          placeholder="Enter FAQ Answer"
          value={formAnswer}
          onChange={(e) => setFormAnswer(e.target.value)}
          className="textarea"
        />
        <button type="submit" className="submit-button">
          {editId ? "Update FAQ" : "Add FAQ"}
        </button>
      </form>

      <div className="faq-container">
        {faqData.length > 0 ? (
          faqData.map((faq, index) => (
            <FAQ
              key={faq.id}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={handleFaqClick}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "20px" }}>No FAQs found...</p>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </section>
  );
};

export default FaqSection;
