import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/recipe.css';

const FoodRecipe = () => {
  const [recipes] = useState([
    { id: 1, image: 'french-toast.jpg', name: 'French Toast', category: 'Breakfast' },
    { id: 2, image: 'croque-madame.jpg', name: 'Croque Madame', category: 'Breakfast' },
    { id: 3, image: 'egg-bhurji.jpg', name: 'Egg Bhurji', category: 'Breakfast' },
    { id: 4, image: 'eggs-benedict.jpg', name: 'Eggs Benedict Toast', category: 'Breakfast' },
    { id: 5, image: 'cinnamon-pancakes.jpg', name: 'Cinnamon Pancakes', category: 'Breakfast' },
    { id: 6, image: 'katsu-sando.jpg', name: 'Katsu Sando', category: 'Lunch' },
    { id: 7, image: 'igado.jpg', name: 'Igado', category: 'Lunch' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [displayedRecipes, setDisplayedRecipes] = useState(recipes);

  // Handle search functionality
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchQuery(term);

    if (term === '') {
      setDisplayedRecipes(recipes);
    } else {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(term.toLowerCase())
      );
      setDisplayedRecipes(filtered);
    }
  };

  return (
    <div className="recipe-page-wrapper">
      <Sidebar />
      <div className="recipe-main-content">
        <div className="recipe-list-section">
          <div className="recipe-header">
            <h1>FoodRecipe Lists</h1>
            <div className="recipe-controls">
              <input 
                type="text" 
                placeholder="Search..." 
                className="recipe-search-input"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="recipe-table-wrapper">
            <table className="recipe-table-display">
              <thead>
                <tr>
                  <th>Food ID</th>
                  <th>Recipe Image</th>
                  <th>Recipe Name</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedRecipes.map((recipe) => (
                  <tr key={recipe.id}>
                    <td>{recipe.id}</td>
                    <td>
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="recipe-preview-img"
                      />
                    </td>
                    <td>{recipe.name}</td>
                    <td>{recipe.category}</td>
                    <td>
                      <button className="recipe-action-menu">⋮</button>
                      <button className="recipe-action-edit">✏️</button>
                      <button className="recipe-action-delete">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="new-recipe-btn bottom-right-btn">➕</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodRecipe;