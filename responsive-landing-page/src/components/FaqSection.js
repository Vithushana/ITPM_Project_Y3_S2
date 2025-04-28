import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled Components
const Section = styled.section`
  padding: 50px 25px 100px;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 45px;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  line-height: 1;

  span {
    color: rgb(43, 83, 141);
  }
`;

const FaqContainer = styled.div`
  width: 82%;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 9px;
  overflow: hidden;
  line-height: 1.9;
  margin: 0 auto;
`;

const FaqItem = styled.div`
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  width: 100%;

  &:last-child {
    border-bottom: none;
  }
`;

const FaqQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #fff;
  font-weight: bold;
  font-size: 20px;
  color: #333;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const FaqAnswer = styled.div`
  padding: 0 20px 20px;
  background-color: #fff;
  color: #555;
  font-size: 19px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const Icon = styled.span`
  font-size: 28px;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  background-color: ${({ type }) => (type === 'edit' ? '#4caf50' : '#f44336')};
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;

  &:hover {
    opacity: 0.8;
  }
`;

const Form = styled.form`
  margin-bottom: 30px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  background-color: #2b5395;
  color: white;
  padding: 10px 20px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    opacity: 0.8;
  }
`;

// FAQ Component
const FAQ = ({ index, question, answer, isOpen, onClick, onEdit, onDelete }) => {
  return (
    <FaqItem>
      <FaqQuestion onClick={() => onClick(index)}>
        {question}
        <Icon>{isOpen ? '-' : '+'}</Icon>
      </FaqQuestion>
      <FaqAnswer isOpen={isOpen}>
        {answer}
        <ButtonGroup>
          <ActionButton type="edit" onClick={() => onEdit(index)}>Edit</ActionButton>
          <ActionButton type="delete" onClick={() => onDelete(index)}>Delete</ActionButton>
        </ButtonGroup>
      </FaqAnswer>
    </FaqItem>
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
      // Update existing FAQ
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
      // Add new FAQ
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
    <Section>
      <Title>
        Frequently Asked Questions<br /> about <span>HomeStock Management System</span>
      </Title>

      {/* Form to Add/Edit FAQ */}
      <Form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          placeholder="Enter FAQ Question"
          value={formQuestion}
          onChange={(e) => setFormQuestion(e.target.value)}
        />
        <TextArea
          rows="4"
          placeholder="Enter FAQ Answer"
          value={formAnswer}
          onChange={(e) => setFormAnswer(e.target.value)}
        />
        <SubmitButton type="submit">
          {editId ? "Update FAQ" : "Add FAQ"}
        </SubmitButton>
      </Form>

      {/* FAQ List */}
      <FaqContainer>
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
      </FaqContainer>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </Section>
  );
};

export default FaqSection;
