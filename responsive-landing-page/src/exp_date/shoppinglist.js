import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/shopping.css';
import bannerImage from '../exp_img/images.jpg';

const ShoppingList = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    },
    {
      name: 'Groceries',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    },
    {
      name: 'Medicines',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    },
    {
      name: 'Balance Money',
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    },
  ];

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="App">
      {/* Back Button */}
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
      </div>

      {/* Banner Section */}
      <div className="banner">
        <div className="banner-text">
          <h1>Make Your Automated Shopping Lists</h1>
          <p>
            🛒 Effortless Shopping, Smart Choices! We provide a curated selection of the finest, nutrient-rich products tailored to your needs—automatically.
          </p>
          <button className="learn-more-btn">➕ Add List</button>
        </div>
        <div className="banner-image">
          <img src={bannerImage} alt="Grocery Banner" />
        </div>
      </div>

      {/* Category Section */}
      <div className="category-section">
        <h2>Category</h2>
        <div className="category-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <img src={category.image} alt={category.name} />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <p>Home-Zone</p>
      </footer>
    </div>
  );
};

export default ShoppingList;