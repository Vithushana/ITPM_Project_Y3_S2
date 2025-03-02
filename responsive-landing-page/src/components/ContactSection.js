import React from 'react';
import styled from 'styled-components';

import email from '../images/email.png';  // Replace with a relevant email icon
import call from '../images/call.png';    // Replace with a relevant phone icon
import location from '../images/location.png';  // Replace with a relevant location icon

const ContactSection = () => {
  return (
    <Container>
      <Title>Contact Us for 
        <br></br>
        Home-Zone Reforms Queries</Title>
      <Description>
        If you have any questions or need more information on the reforms in Home-Zone legal system, feel free to reach out to our team.
      </Description>
      <ContactOptions>
        <ContactOption>
          <Icon><Image src={email} alt="email" /></Icon>
          <Info>
            <Label>Email address</Label>
            <Value>homezone2gmail.com</Value> {/* Example contact email */}
          </Info>
        </ContactOption>
        <ContactOption>
          <Icon><Image src={call} alt="phone" /></Icon>
          <Info>
            <Label>Get in touch</Label>
            <Value>+94 76 342 5210</Value> {/* Example contact number */}
          </Info>
        </ContactOption>
        <ContactOption>
          <Icon><Image src={location} alt="location" /></Icon>
          <Info>
            <Label>Office Location</Label>
            <Value>Colombo, Sri Lanka</Value> {/* Example location */}
          </Info>
        </ContactOption>
      </ContactOptions>
    </Container>
  );
};

export default ContactSection;

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
`;

const ContactOption = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Image = styled.img`
  width: 60px;  /* Ensure all icons have a consistent width */
  height: 60px; /* Ensure all icons have a consistent height */
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
