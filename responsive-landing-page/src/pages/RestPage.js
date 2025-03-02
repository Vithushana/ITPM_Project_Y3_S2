import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import backgroundImage from '../exp_img/home.jpeg';
import axios from 'axios';

// Animation for the Reset Box (Fades in and slides down)
const fadeInSlideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ResetContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); 
  }

  > * {
    position: relative; 
    z-index: 1;
  }
`;

const ResetBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  animation: ${fadeInSlideDown} 0.8s ease-in-out;  /* Applying animation */
`;

const InputContainer = styled.div`
  position: relative;
  width: 78%;
  margin-bottom: 20px;
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #777;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 40px 12px 40px;
  border-radius: 8px;
  border: 2px solid #ccc;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: rgb(43, 83, 141);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: rgb(43, 83, 141);
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: rgb(24, 47, 83);
  }
`;

const BackLink = styled.p`
  font-size: 14px;
  margin-top: 20px;
  color: rgb(43, 83, 141);

  a {
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/auth/reset-password',
          { email: email.trim() },
          {
            headers: {
              'Content-Type': 'application/json', 
            },
          }
        );
        setMessage(response.data);
      } catch (error) {
        setMessage('Error sending reset password email. Please try again later.');
        console.error(error.response);
      }
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <ResetContainer>
      <ResetBox>
        <h2>Reset Password</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleReset}>
          <InputContainer>
            <Icon><FaLock /></Icon>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <Button type="submit">Reset Password</Button>
        </form>
        <BackLink>
          Remembered your password? <a href="/login" onClick={() => navigate('/')}>Login</a>
        </BackLink>
      </ResetBox>
    </ResetContainer>
  );
};

export default ResetPasswordPage;
