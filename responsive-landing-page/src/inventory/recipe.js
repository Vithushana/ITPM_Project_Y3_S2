import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/recipe.css";

const API_URL = "http://localhost:8080/api/recipes";

const FoodRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ image: "", name: "", category: "" });
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setRecipes(data);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddOrUpdate = async () => {
    if (editingRecipe) {
      await fetch(`${API_URL}/${editingRecipe.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });
    }
    setShowPopup(false);
    setEditingRecipe(null);
    fetchRecipes();
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setNewRecipe(recipe);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchRecipes();
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
                {recipes
                  .filter((recipe) =>
                    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((recipe) => (
                    <tr key={recipe.id}>
                      <td>{recipe.id}</td>
                      <td><img src={recipe.image} alt={recipe.name} className="recipe-preview-img" /></td>
                      <td>{recipe.name}</td>
                      <td>{recipe.category}</td>
                      <td><button className="recipe-action-view" onClick={() => handleDelete(recipe.id)}>👁️</button>
                        <button className="recipe-action-edit" onClick={() => handleEdit(recipe)}>✏️</button>
                        <button className="recipe-action-delete" onClick={() => handleDelete(recipe.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button className="new-recipe-btn bottom-right-btn" onClick={() => setShowPopup(true)}>➕</button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <h2>{editingRecipe ? "Edit Recipe" : "Add Recipe"}</h2>
          <input type="text" placeholder="Name" value={newRecipe.name} onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })} />
          <input type="text" placeholder="Image URL" value={newRecipe.image} onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })} />
          <input type="text" placeholder="Category" value={newRecipe.category} onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })} />
          <button onClick={handleAddOrUpdate}>{editingRecipe ? "Update" : "Add"}</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default FoodRecipe;
