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
import FoodRecipe from './inventory/recipe';

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

// 👇 A simple PrivateRoute wrapper
const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Start with null (unknown)

  // Check localStorage on first load
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  // Update localStorage whenever isLoggedIn changes (except when null)
  useEffect(() => {
    if (isLoggedIn !== null) {
      localStorage.setItem('isLoggedIn', isLoggedIn);
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    // Show loading screen until login state is known
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AppContainer>
        <HeaderBasedOnLocation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/home" element={<PrivateRoute isLoggedIn={isLoggedIn}><HomeStock /></PrivateRoute>} />
          <Route path="/reset" element={<ResetPasswordPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

          {/* Inventory related routes */}
          <Route path="/inventory" element={<PrivateRoute isLoggedIn={isLoggedIn}><Inventory /></PrivateRoute>} />
          <Route path="/medicine" element={<PrivateRoute isLoggedIn={isLoggedIn}><MedicinePage /></PrivateRoute>} />
          <Route path="/electronics" element={<PrivateRoute isLoggedIn={isLoggedIn}><ElectronicsPage /></PrivateRoute>} />
          <Route path="/budget" element={<PrivateRoute isLoggedIn={isLoggedIn}><BudgetPage /></PrivateRoute>} />
          <Route path="/AlertPage" element={<PrivateRoute isLoggedIn={isLoggedIn}><AlertPage /></PrivateRoute>} />
          <Route path="/AddItemModal" element={<PrivateRoute isLoggedIn={isLoggedIn}><AddItemModal /></PrivateRoute>} />
          <Route path="/UpdateItemModal" element={<PrivateRoute isLoggedIn={isLoggedIn}><UpdateItemModal /></PrivateRoute>} />
          <Route path="/ShoppingList" element={<PrivateRoute isLoggedIn={isLoggedIn}><ShoppingList /></PrivateRoute>} />
          <Route path="/SiderChatBot" element={<PrivateRoute isLoggedIn={isLoggedIn}><SiderChatBot /></PrivateRoute>} />
          <Route path="/FoodRecipe" element={<PrivateRoute isLoggedIn={isLoggedIn}><FoodRecipe /></PrivateRoute>} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <LocationBasedContent isLoggedIn={isLoggedIn} />
      </AppContainer>
    </Router>
  );
};

// Helper to show Header only on some pages
const HeaderBasedOnLocation = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const hideHeaderOnPaths = [
    '/inventory', '/medicine', '/electronics', '/budget',
    '/AlertPage', '/ShoppingList', '/SiderChatBot', '/FoodRecipe'
  ];

  if (hideHeaderOnPaths.includes(location.pathname)) {
    return null;
  }

  return <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
};

// Helper to show Footer, FAQ, and Contact sections conditionally
const LocationBasedContent = ({ isLoggedIn }) => {
  const location = useLocation();
  const hideContentOnPaths = [
    '/inventory', '/medicine', '/electronics', '/budget',
    '/AlertPage', '/ShoppingList', '/SiderChatBot', '/FoodRecipe'
  ];

  if (!isLoggedIn || hideContentOnPaths.includes(location.pathname)) {
    return null;
  }

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
};

export default App;
