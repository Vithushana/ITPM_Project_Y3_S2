import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import email from '../images/email.png';
import call from '../images/call.png';
import location from '../images/location.png';

const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openMapModal = () => setIsMapOpen(true);
  const closeMapModal = () => setIsMapOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/contact', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      closeModal();
    } catch (error) {
      alert('Failed to send message. Please try again.');
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Title>
          Contact Us for 
          <br />
          Home-Zone Reforms Queries
        </Title>
        <Description>
          If you have any questions or need more information on the reforms in Home-Zone legal system, feel free to reach out to our team.
        </Description>

        <ContactOptions>
          <ContactOption>
            <Icon><Image src={email} alt="email" /></Icon>
            <Info>
              <Label>Email address</Label>
              <Value>homezone2@gmail.com</Value>
            </Info>
          </ContactOption>
          <ContactOption>
            <Icon><Image src={call} alt="phone" /></Icon>
            <Info>
              <Label>Get in touch</Label>
              <Value>+94 76 342 5210</Value>
            </Info>
          </ContactOption>
          <ContactOption onClick={openMapModal} style={{ cursor: 'pointer' }}>
            <Icon><Image src={location} alt="location" /></Icon>
            <Info>
              <Label>Office Location</Label>
              <Value>Colombo, Sri Lanka</Value>
            </Info>
          </ContactOption>
        </ContactOptions>

        <ContactButton onClick={openModal}>Contact Us</ContactButton>
      </Container>

      {/* Message Form Modal */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeModal}>×</CloseButton>
            <h3>Send Us a Message</h3>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <SubmitButton type="submit">Send</SubmitButton>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Map Modal */}
      {isMapOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeMapModal}>×</CloseButton>
            <h3>Our Location</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126745.38038457436!2d79.77384272776874!3d6.921838469020928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2595a1c18809f%3A0x49e7f16a1187c7d7!2sColombo!5e0!3m2!1sen!2slk!4v1681676429804!5m2!1sen!2slk"
              width="100%"
              height="350"
              style={{ border: 0, marginTop: "1rem" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Colombo Location"
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default ContactSection;

// Styled Components

const Container = styled.div`
  text-align: center;
  background-color: #fff;
  padding: 2rem 1rem;
  border: 3px solid rgb(28, 59, 120);
  border-radius: 0.5rem;
  margin: 2rem auto;
  width: 80%;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: black;
  margin-bottom: 2rem;
`;

const ContactOptions = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ContactOption = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem;
`;

const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

const Info = styled.div`
  text-align: center;
`;

const Label = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const Value = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const ContactButton = styled.button`
  margin-top: 2rem;
  background-color: rgb(28, 59, 120);
  color: white;
  padding: 0.9rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgb(22, 46, 92);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  width: 90%;
  max-width: 500px;
  margin: 5% auto;
  padding: 2rem;
  border-radius: 8px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  margin: 0.5rem 0 1rem 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: rgb(28, 59, 120);
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: rgb(22, 46, 92);
  }
`;
