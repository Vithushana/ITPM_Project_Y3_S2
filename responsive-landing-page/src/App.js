import React, { useState } from 'react';
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


  return (
    <Router>
      <AppContainer>
        {/* Render header based on the current path */}
        <HeaderBasedOnLocation />
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
        </Routes>
        <LocationBasedContent isLoggedIn={isLoggedIn} />
      </AppContainer>
    </Router>
  );
};

const HeaderBasedOnLocation = () => {
  const location = useLocation();
  return location.pathname !== '/inventory' && location.pathname !== '/medicine' && location.pathname !== '/electronics' && location.pathname !== '/budget' && location.pathname !== '/AlertPage' && <Header />;
};

const LocationBasedContent = ({ isLoggedIn }) => {
  const location = useLocation();
  if (!isLoggedIn) return null;

  return location.pathname !== '/inventory' && location.pathname !== '/medicine' && location.pathname !== '/electronics' && location.pathname !== '/budget' && location.pathname !== '/AlertPage' &&  (
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
