import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import HomeStock from './components/Features';
import Footer from './components/Footer';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ContactSection from './components/ContactSection';
import FaqSection from './components/FaqSection';
import ResetPasswordPage from './pages/RestPage';
import Inventory from './inventory/Inventory';
import MedicinePage from './inventory/medicine';
import ElectronicsPage from './inventory/electronic';
import BudgetPage from './inventory/budget';
import AlertPage from "./exp_date/alert";
import AddItemModal from "./inventory/AddItemModal";
import UpdateItemModal from './inventory/UpdateItemModal';
import ShoppingList from "./exp_date/shoppinglist";
import SiderChatBot from './voice_control/siderchatbot';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Section = styled.section`
  padding: 50px;
  background-color: #f9f9f9;
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Initialize isLoggedIn from localStorage on page load
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  // Update localStorage when isLoggedIn changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <AppContainer>
        {/* Render header based on the current path */}
        <HeaderBasedOnLocation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/home" element={isLoggedIn ? <HomeStock /> : <Navigate to="/login" />} />
          <Route path="/reset" element={<ResetPasswordPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/inventory" element={isLoggedIn ? <Inventory /> : <Navigate to="/login" replace />} />
          <Route path="/medicine" element={isLoggedIn ? <MedicinePage /> : <Navigate to="/login" replace />} />
          <Route path="/electronics" element={isLoggedIn ? <ElectronicsPage /> : <Navigate to="/login" replace />} />
          <Route path="/budget" element={isLoggedIn ? <BudgetPage /> : <Navigate to="/login" replace />} />
          <Route path="/AlertPage" element={isLoggedIn ? <AlertPage /> : <Navigate to="/login" replace />} />
          <Route path="/AddItemModal" element={isLoggedIn ? <AddItemModal /> : <Navigate to="/login" replace />} />
          <Route path="/UpdateItemModal" element={isLoggedIn ? <UpdateItemModal /> : <Navigate to="/login" replace />} />
          <Route path="/ShoppingList" element={isLoggedIn ? <ShoppingList /> : <Navigate to="/login" replace />} />
          <Route path="/SiderChatBot" element={isLoggedIn ? <SiderChatBot /> : <Navigate to="/login" replace />} />
        </Routes>
        <LocationBasedContent isLoggedIn={isLoggedIn} />
      </AppContainer>
    </Router>
  );
};

// Fix: Destructure isLoggedIn and setIsLoggedIn from props
const HeaderBasedOnLocation = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();

  // Render Header only on specific routes
  if (
    location.pathname !== '/inventory' &&
    location.pathname !== '/medicine' &&
    location.pathname !== '/electronics' &&
    location.pathname !== '/budget' &&
    location.pathname !== '/AlertPage' &&
    location.pathname !== '/ShoppingList' &&
    location.pathname !== '/SiderChatBot'
  ) {
    return <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
  }

  return null;
};

// Fix: Destructure isLoggedIn from props
const LocationBasedContent = ({ isLoggedIn }) => {
  const location = useLocation();

  // Render content only on specific routes and if logged in
  if (
    isLoggedIn &&
    location.pathname !== '/inventory' &&
    location.pathname !== '/medicine' &&
    location.pathname !== '/electronics' &&
    location.pathname !== '/budget' &&
    location.pathname !== '/AlertPage' &&
    location.pathname !== '/ShoppingList' &&
    location.pathname !== '/SiderChatBot'
  ) {
    return (
      <>
        <Section id="faqSection">
          <FaqSection />
        </Section>
        <Section id="resources">
          <ContactSection />
        </Section>
        <Footer />
      </>
    );
  }

  return null;
};

export default App;