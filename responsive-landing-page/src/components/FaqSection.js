import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

const FAQ = ({ index, question, answer, isOpen, onClick }) => {
  return (
    <FaqItem onClick={() => onClick(index)}>
      <FaqQuestion>
        {question}
        <Icon>{isOpen ? '-' : '+'}</Icon>
      </FaqQuestion>
      <FaqAnswer isOpen={isOpen}>{answer}</FaqAnswer>
    </FaqItem>
  );
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqData, setFaqData] = useState([]); // ❗Dynamic from backend

  // Fetch FAQs from backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/faqs')
      .then((response) => {
        setFaqData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching FAQ data:", error);
      });
  }, []);

  const handleFaqClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section>
      <Title>
        Frequently Asked Questions<br /> about <span>HomeStock Management System</span>
      </Title>

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
            />
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "20px" }}>No FAQs found...</p>
        )}
      </FaqContainer>
    </Section>
  );
};

export default FaqSection;
