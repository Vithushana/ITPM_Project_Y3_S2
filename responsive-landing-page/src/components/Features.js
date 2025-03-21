import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import LaunchLogo from '../exp_img/lanuch.png';
import ResponseLogo from '../exp_img/update.png';
import VisibilityLogo from '../exp_img/transe.png';
import ControlLogo from '../exp_img/friendly.png';

// Styled Components
const Section = styled.section`
  padding: 100px 25px 100px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    max-width: 600px;
    margin: 0 auto 20px;
    color: rgb(43, 83, 141);
    font-family: cursive;
  }

  p {
    font-size: 24px;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    padding: 100px 15px 50px;
  }
`;

const Heading = styled.h1`
  font-size: 62px;
  margin-bottom: 20px;
  text-align: center;
  max-width: 90%;
  margin: 0 auto;
  line-height: 1.2;
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
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-width: 1200px;
  margin-top: 20px;
`;

const FeastoSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 45%;
  min-width: 280px;
  margin-bottom: 20px;
  opacity: 0; /* Start hidden for animation */
  animation: ${({ isVisible }) => (isVisible ? 'fadeIn 0.5s ease forwards' : 'none')};

  img {
    width: 60px;
    margin-right: 15px;
  }

  h2 {
    color: #2c3e50;
    margin-bottom: 10px;
    font-size: 20px;
    line-height: 1.2;
  }

  p {
    font-size: 17px;
    line-height: 1.5;
    color: #7f8c8d;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    max-width: 100%;

    img {
      margin-bottom: 15px;
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
  width: 800px;
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
    border: 2px solid #85a98f;
  }
`;

const HomeStock = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Define the feature data
  const features = [
    {
      id: 1,
      title: 'Smart Inventory Management',
      description: 'Easily track your groceries, household essentials, and daily supplies in real-time.',
      img: LaunchLogo,
      path: '/inventory',
    },
    {
      id: 2,
      title: 'Expiration Date Reminders',
      description: 'Get timely alerts before food or household products expire, reducing waste and saving money.',
      img: ResponseLogo,
      path: '/AlertPage',
    },
    {
      id: 3,
      title: 'Voice-Activated ChatBot',
      description: 'Monitor your grocery expenses and optimize your spending on household essentials.',
      img: VisibilityLogo,
      path: '/SiderChatBot',
    },
    {
      id: 4,
      title: 'Automated Shopping Lists',
      description: 'Generate dynamic shopping lists based on whats running low in your inventory.',
      img: ControlLogo,
      path: '/ShoppingList',
    },
  ];

  const filteredFeatures = features.filter((feature) =>
    feature.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Section id="features">
      <SubHeading>Smart Home Inventory & Grocery Management</SubHeading>
      <Heading>
        Keep Track of Your Household Essentials <br /> with Easy to Maintain
      </Heading>
      <SearchBarContainer>
        <SearchBar>
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </SearchBarContainer>

      <FeastoContainer>
        {filteredFeatures.map((feature) => (
          <FeastoSection
            key={feature.id}
            isVisible={true} // Trigger animation when visible
            onClick={() => navigate(feature.path)}
          >
            <img src={feature.img} alt={`${feature.title} Logo`} />
            <div>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          </FeastoSection>
        ))}
      </FeastoContainer>
    </Section>
  );
};

export default HomeStock;