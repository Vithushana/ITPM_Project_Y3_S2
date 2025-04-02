import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/recipe.css";

const API_URL = "http://localhost:8080/api/recipes";

const FoodRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [viewingRecipe, setViewingRecipe] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    image: "",
    name: "",
    category: "",
    steps: ""
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      toast.error("Failed to fetch recipes.");
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddOrUpdate = async () => {
    const { name, image, category, steps } = newRecipe;

    if (!name || !image || !category || !steps) {
      toast.warning("Please fill all fields including steps.");
      return;
    }

    const method = editingRecipe ? "PUT" : "POST";
    const endpoint = editingRecipe ? `${API_URL}/${editingRecipe.id}` : API_URL;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        toast.success(editingRecipe ? "Recipe updated." : "Recipe added.");
        setShowModal(false);
        setEditingRecipe(null);
        setNewRecipe({ image: "", name: "", category: "", steps: "" });
        fetchRecipes();
      } else {
        throw new Error("Failed to save recipe.");
      }
    } catch (error) {
      toast.error(editingRecipe ? "Error updating recipe." : "Error adding recipe.");
    }
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setNewRecipe(recipe);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Recipe deleted.");
        fetchRecipes();
      } else {
        throw new Error("Delete failed.");
      }
    } catch (error) {
      toast.error("Error deleting recipe.");
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
                placeholder="Search Food..."
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
                    <tr key={recipe.id} className="recipe-item" style={{ animation: "fadeIn 0.5s ease-out" }}>
                      <td>{recipe.id}</td>
                      <td>
                        <img src={recipe.image} alt={recipe.name} className="recipe-preview-img" />
                      </td>
                      <td>{recipe.name}</td>
                      <td>{recipe.category}</td>
                      <td>
                        <button className="recipe-action-view" onClick={() => setViewingRecipe(recipe)}>👁️</button>
                        <button className="recipe-action-edit" onClick={() => handleEdit(recipe)}>✏️</button>
                        <button className="recipe-action-delete" onClick={() => handleDelete(recipe.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <button
              className="new-recipe-btn bottom-right-btn"
              onClick={() => {
                setShowModal(true);
                setEditingRecipe(null);
                setNewRecipe({ image: "", name: "", category: "", steps: "" });
              }}
            >
              ➕
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="recipe-modal-overlay">
          <div className="recipe-modal-box">
            <h2>{editingRecipe ? "Edit Recipe" : "Add Recipe"}</h2>
            <input
              type="text"
              placeholder="Name"
              value={newRecipe.name}
              onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newRecipe.image}
              onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
            />
            <select
              value={newRecipe.category}
              onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
              className="recipe-modal-select"
            >
              <option value="">Select Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
            <textarea
              rows="5"
              placeholder="Enter recipe steps..."
              value={newRecipe.steps}
              onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })}
              className="recipe-modal-steps"
            />
            <div className="recipe-modal-actions">
              <button onClick={handleAddOrUpdate}>
                {editingRecipe ? "Update" : "Add"}
              </button>
              <button className="recipe-modal-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View-Only Modal */}
      {viewingRecipe && (
        <div className="recipe-modal-overlay">
          <div className="recipe-modal-box">
            <h2>{viewingRecipe.name}</h2>
            <img src={viewingRecipe.image} alt={viewingRecipe.name} className="recipe-view-img" />
            <p><strong>Category:</strong> {viewingRecipe.category}</p>
            <p><strong>Steps:</strong></p>
            <p className="recipe-view-steps">{viewingRecipe.steps || "No steps provided."}</p>
            <div className="recipe-modal-actions">
              <button className="recipe-modal-cancel" onClick={() => setViewingRecipe(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default FoodRecipe;
