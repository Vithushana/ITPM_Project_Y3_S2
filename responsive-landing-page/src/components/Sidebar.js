import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { FaAppleAlt, FaLaptop, FaPills, FaChartPie, FaSignOutAlt, FaUtensils  } from "react-icons/fa";

import logo from '../images/logo.png';
import "../styles/Sidebar.css";

const Logo = styled.img`
  margin-left: 30px;
  width: 140px; 
  height: auto; 
`;

const Sidebar = () => {
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  const handleNavigation = (page, route) => {
    setActive(page);
    navigate(route);
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/home");
  };

  return (
    <div className="sidebar">
      <Logo src={logo} alt="Logo" />

      <div className="menu">

        <div 
          className={`menu-item1 ${active === "Groceries" ? "active" : ""}`} 
          onClick={() => handleNavigation("Groceries", "/inventory")}
        >
          <FaAppleAlt className="icon" /> Groceries
        </div>

        <div 
          className={`menu-item1 ${active === "Electronics" ? "active" : ""}`} 
          onClick={() => handleNavigation("Electronics", "/electronics")}
        >
          <FaLaptop className="icon" /> Electronics
        </div>

        <div 
          className={`menu-item1 ${active === "Medicines" ? "active" : ""}`} 
          onClick={() => handleNavigation("Medicines", "/medicine")}
        >
          <FaPills className="icon" /> Medicines
        </div>

        <div 
          className={`menu-item1 ${active === "FoodRecipe" ? "active" : ""}`} 
          onClick={() => handleNavigation("FoodRecipe", "/FoodRecipe")}
        >
          <FaUtensils  className="icon" /> Recipe
        </div>

        <div 
          className={`menu-item1 ${active === "Budgets" ? "active" : ""}`} 
          onClick={() => handleNavigation("Budgets", "/budget")}
        >
          <FaChartPie className="icon" /> Budgets
        </div>

      </div>
      <div className="logout" onClick={handleLogout}>
        <FaSignOutAlt className="icon" /> Back To Home
      </div>
      
    </div>
  );
};

export default Sidebar;
