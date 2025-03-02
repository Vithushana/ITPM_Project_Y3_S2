// Header.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../images/logo.png';

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: -10px;
  border-radius: 2px solid blue;
  background-color: rgb(186, 202, 226);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled.img`
  margin-left: 60px;
  width: 140px; /* Adjust width as per your preference */
  height: auto; /* Keep the aspect ratio intact */
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 35px;
  color: black;
  font-size: 19px;
  margin-left: 20px;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    background-color: white;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    padding: 10px 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(ScrollLink)`
  cursor: pointer;
  position: relative;
  padding: 5px 0;
  transition: color 0.3s ease-in-out; /* Smooth transition for text color */
  
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -5px;
    width: 0;
    height: 3px;
    background-color: rgb(43, 83, 141);
    transition: all 0.3s ease-in-out;
    transform: translateX(-50%);
  }

  &:hover {
    color: rgb(43, 83, 141); /* Change text color */
  }

  &:hover::after {
    width: 100%; /* Expand underline on hover */
  }

  @media (max-width: 768px) {
    padding: 10px;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 18px;
  width: 400px;
  align-items: center;
`;

const SignUpButton = styled(Link)` /* Use Link for navigation */
  padding: 11px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:rgb(43, 83, 141);
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background-color:rgb(34, 25, 115);
  }

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    right: 40px;
  }
`;

const ReportIssueButton = styled.a`
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: black;
  border: 2px solid #dadadd;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background-color: #e5e5e7;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;
  margin-top: 3px;
  color: #888;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    left: 30px;
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderContainer>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Logo src={logo} alt="Logo" />
        <HamburgerMenu onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </HamburgerMenu>
        <NavLinks isOpen={isOpen}>
          <NavLink to="features" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="faqSection" smooth={true} duration={500} onClick={() => setIsOpen(false)}>FAQ</NavLink>
          <NavLink to="resources" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Contact Us</NavLink>
        </NavLinks>
      </div>
      <div>
        <ButtonContainer>
          <ReportIssueButton href="#demo">Request a Demo</ReportIssueButton>
          <SignUpButton to="/signup">Sign up</SignUpButton> {/* Link to /signup */}
        </ButtonContainer>
      </div>
    </HeaderContainer>
  );
};

export default Header;
