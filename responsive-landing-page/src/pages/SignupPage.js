import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import backgroundImage from '../exp_img/home.jpeg';
import logoImage from '../images/logo.png';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

// Fade-in animation for the background
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Slide-up animation for the form
const slideUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const SignupContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  animation: ${fadeIn} 1.2s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Dark overlay */
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const SignupForm = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px 30px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: ${slideUp} 1s ease-in-out;

  img {
    width: 120px;
    margin-bottom: 20px;
  }

  h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: bold;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  input {
    border: none;
    outline: none;
    padding-left: 10px;
    font-size: 16px;
    width: 100%;
    background: transparent;
  }

  svg {
    color: #aaa;
    margin-right: 10px;
  }
`;

const Input = styled.input``;

const Button = styled.button`
  padding: 12px 20px;
  background-color: rgb(43, 83, 141);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background-color: rgb(25, 48, 83);
    transform: scale(1.05);
  }
`;

const RedirectLink = styled.div`
  text-align: center;
  margin-top: 15px;

  a {
    text-decoration: none;
    color: rgb(43, 83, 141);
    font-weight: bold;
    transition: color 0.3s ease-in-out;

    &:hover {
      text-decoration: underline;
      color: rgb(25, 48, 83);
    }
  }
`;

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phone,
      }),
    })
      .then((response) => {
        alert(`Welcome! Your account has been created.`);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('There was an error creating your account. Please try again.');
      });
  };

  return (
    <SignupContainer>
      <SignupForm>
        <img src={logoImage} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name"></Label>
            <InputWrapper>
              <FaUser />
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </div>
          <div>
            <Label htmlFor="email"></Label>
            <InputWrapper>
              <FaEnvelope />
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </div>
          <div>
            <Label htmlFor="phone"></Label>
            <InputWrapper>
              <FaPhone />
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </div>
          <div>
            <Label htmlFor="password"></Label>
            <InputWrapper>
              <FaLock />
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
        <RedirectLink>
          Already have an account? <Link to="/login">Login here</Link>
        </RedirectLink>
      </SignupForm>
    </SignupContainer>
  );
};

export default SignupPage;
