import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

import LaunchLogo from '../exp_img/lanuch.png';
import ResponseLogo from '../exp_img/update.png';
import VisibilityLogo from '../exp_img/transe.png';
import ControlLogo from '../exp_img/friendly.png';

import { useNavigate } from 'react-router-dom';

const Section = styled.section`
  padding: 100px 25px 100px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align the content */

  h3 {
    max-width: 600px;
    margin: 0 auto 20px; /* Center horizontally and add bottom margin */
    color:rgb(43, 83, 141);
    font-family: cursive;
  }

  p {
    font-size: 24px; /* Increase font size */
    margin-bottom: 10px; /* Add bottom margin */
  }

  @media (max-width: 768px) {
    padding: 100px 15px 50px;
  }
`;

const Heading = styled.h1`
  font-size: 62px;
  margin-bottom: 20px;
  text-align: center;
  max-width: 90%; /* Adjust the width as needed to control line breaks */
  margin: 0 auto; /* Center the heading within the container */
  line-height: 1.2; /* Adjust line height for better readability */
  position: relative;

  }
`;

const SubHeading = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: rgb(43, 83, 141);
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const FeastoContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow the sections to wrap to the next line if needed */
  gap: 20px; /* Add gap between the sections */
  justify-content: center; /* Center the items horizontally */
  max-width: 1200px;
  margin-top: 20px;

  .feasto-section {
    display: flex;
    flex-direction: row; /* Layout sections horizontally */
    align-items: center;
    justify-content: space-between;
    max-width: 45%; /* Limit the width of each section */
    min-width: 280px; /* Ensure sections don't get too small */
    margin-bottom: 20px;

    img {
      width: 60px; /* Adjust image size as needed */
      margin-right: 15px;
    }

    h2 {
      color: #2c3e50;
      margin-bottom: 10px;
      font-size: 20px;
      line-height: 0.005;
    }

    p {
      font-size: 17px;
      line-height: 1.5;
      color: #7f8c8d;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .feasto-section {
      flex-direction: column; /* Stack the sections vertically on small screens */
      text-align: center;
      max-width: 100%; /* Ensure the sections take full width on small screens */
    }

    img {
      margin-bottom: 15px; /* Add margin below the image */
    }

    h2 {
      font-size: 16px;
    }

    p {
      font-size: 14px;
    }
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
  width: 100%;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 30px;
  padding: 5px 20px;
  border: 2px solid rgb(43, 83, 141);
  width: 800px; /* Increased width to 500px */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  input {
    border: none;
    background-color: transparent;
    font-size: 18px;
    width: 100%;
    padding: 10px;
    border-radius: 30px;
    outline: none;
  }

  .search-icon {
    font-size: 20px;
    color: rgb(43, 83, 141);
    margin-right: 10px;
  }

  &:focus-within {
    border: 2px solid #85A98F;
  }
`;


const HomeStock = () => {
  const navigate = useNavigate();
  return (
    
    <Section id="features">
      <SubHeading>Smart Home Inventory & Grocery Management</SubHeading>
      <Heading>
        Keep Track of Your Household Essentials <br /> with Easy to Maintain 
      </Heading>
      <br />
      <SearchBarContainer>
        <SearchBar>
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search for items..." />
        </SearchBar>
      </SearchBarContainer>

      <FeastoContainer>
        <div className="feasto-section" onClick={() => navigate('/inventory')}>
          <img src={LaunchLogo} alt="Inventory Logo" />
          <div>
            <h2>Smart Inventory Management</h2>
            <p>Easily track your groceries, household essentials, and daily supplies in real-time.</p>
          </div>
        </div>
        <div className="feasto-section" onClick={() => navigate('/AlertPage')}>
          <img src={ResponseLogo} alt="Reminder Logo" />
          <div>
            <h2>Expiration Date Reminders</h2>
            <p>Get timely alerts before food or household products expire, reducing waste and saving money.</p>
          </div>
        </div>
        <div className="feasto-section" onClick={() => navigate('/SiderChatBot')}>
          <img src={VisibilityLogo} alt="Budget Logo" />
          <div>
            <h2>Voice-Activated Shopping Lists</h2>
            <p>Monitor your grocery expenses and optimize your spending on household essentials.</p>
          </div>
        </div>
        <div className="feasto-section" onClick={() => navigate('/ShoppingList')}>
          <img src={ControlLogo} alt="Shopping List Logo" />
          <div>
            <h2>Automated Shopping Lists</h2>
            <p>Generate dynamic shopping lists based on whats running low in your inventory.</p>
          </div>
        </div>
      </FeastoContainer>
    </Section>
    
  );
};

export default HomeStock;

