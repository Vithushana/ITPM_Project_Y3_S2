import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../images/logo.png';

import DemoVideoModal from './DemoVideoModal';
import NotificationModal from './NotificationModal';
import './NotificationModal.css';

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgb(186, 202, 226);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled.img`
  margin-left: 60px;
  width: 140px;
  height: auto;
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
  transition: color 0.3s ease-in-out;

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
    color: rgb(43, 83, 141);
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 10px;
    text-align: center;
  }
`;

const NavButton = styled.div`
  cursor: pointer;
  padding: 5px 0;
  font-size: 19px;
  color: black;

  &:hover {
    color: rgb(43, 83, 141);
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

const AuthButton = styled(Link)`
  padding: 11px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(43, 83, 141);
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background-color: rgb(34, 25, 115);
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

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [allReminders, setAllReminders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('loggedIn') === 'true';
    if (typeof setIsLoggedIn === 'function') {
      setIsLoggedIn(loggedInStatus);
    }

    fetch("http://localhost:8080/api/reminders")
      .then((res) => res.json())
      .then((data) => setAllReminders(data))
      .catch((err) => console.error("Failed to fetch reminders:", err));
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    if (typeof setIsLoggedIn === 'function') {
      setIsLoggedIn(false);
      localStorage.removeItem('loggedIn');
      navigate('/');
    }
  };

  return (
    <HeaderContainer>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Logo src={logo} alt="Logo" />
        <HamburgerMenu onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </HamburgerMenu>
        <NavLinks isOpen={isOpen}>
          <NavLink to="features" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="faqSection" smooth={true} duration={500} onClick={() => setIsOpen(false)}>FAQ</NavLink>
          <NavLink to="resources" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Contact Us</NavLink>
          <NavButton onClick={() => {
            setShowNotification(true);
            setIsOpen(false);
          }}>Notification</NavButton>
        </NavLinks>
      </div>
      <div>
        <ButtonContainer>
          <ReportIssueButton as="button" onClick={() => setShowDemo(true)}>Request a Demo</ReportIssueButton>
          {isLoggedIn ? (
            <AuthButton as="button" onClick={handleLogout}>Logout</AuthButton>
          ) : (
            <AuthButton to="/signup">Sign Up</AuthButton>
          )}
        </ButtonContainer>
      </div>
      <DemoVideoModal show={showDemo} onClose={() => setShowDemo(false)} />
      <NotificationModal
        show={showNotification}
        onClose={() => setShowNotification(false)}
        reminders={allReminders}
      />
    </HeaderContainer>
  );
};

export default Header;
