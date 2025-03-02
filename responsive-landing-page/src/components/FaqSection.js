import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 50px 25px 100px;
  background-color: #ffrgb(209, 210, 211)f;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 45px;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  line-height: 1; // Adjust this value as needed

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

  const faqData = [
    {
      question: 'What is the purpose of the HomeStock Inventory Management System?',
      answer: 'The HomeStock system helps users manage household inventory efficiently by tracking items like groceries, cleaning supplies, and other home essentials. It ensures that users never run out of important items and can plan their shopping better.',
    },
    {
      question: 'How does the HomeStock system keep track of inventory?',
      answer: 'The system uses real-time updates to monitor the quantity of items in stock. Users can add, update, or delete items manually, or use voice commands and barcode scanning to streamline the process.',
    },
    {
      question: 'What types of items does the HomeStock system manage?',
      answer: 'The system is flexible and can manage a wide range of household items, including groceries, cleaning supplies, home appliances, furniture, and other essential goods. Users can categorize items for easy tracking.',
    },
    {
      question: 'Can I track expired items with the HomeStock system?',
      answer: 'Yes, HomeStock allows users to input expiration dates for perishable goods. The system will notify users when an item is approaching its expiration date, helping to reduce waste.',
    },
    {
      question: 'How do I update or delete items from my inventory?',
      answer: 'You can easily update or delete items using the app’s interface. Simply find the item in your inventory list, edit its details, or remove it completely from the list if no longer needed.',
    },
    {
      question: 'Is there a mobile app for the HomeStock system?',
      answer: 'Yes, HomeStock has a mobile app that allows users to manage their inventory on the go. You can add, update, or delete items and receive notifications for low stock or upcoming expiration dates.',
    },
    {
      question: 'Does the system support voice commands?',
      answer: 'Yes, HomeStock has a voice command feature that allows users to add, update, or remove items simply by speaking. This feature makes managing your inventory hands-free and more convenient.',
    },
  ];
  

  const handleFaqClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    
    <Section>
      <Title>
      Frequently Asked Questions<br /> about <span>HomeStock Management System</span>
      </Title>
      <FaqContainer>
        {faqData.map((faq, index) => (
          <FAQ
            key={index}
            index={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={handleFaqClick}
          />
        ))}
      </FaqContainer>
    </Section>
    
  );
};

export default FaqSection;
