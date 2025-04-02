import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/budget.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPage = () => {
  const [budgetItems, setBudgetItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [newItem, setNewItem] = useState({
    category: "",
    amount: "",
  });

  useEffect(() => {
    const fetchBudgetItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/budget");
        setBudgetItems(response.data);
      } catch (error) {
        toast.error("Failed to fetch budget items.");
      }
    };
    fetchBudgetItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/budget/${id}`);
      setBudgetItems(budgetItems.filter((item) => item.id !== id));
      toast.success("Item deleted successfully.");
    } catch (error) {
      toast.error("Error deleting budget item.");
    }
  };

  const handleAddNewItem = async () => {
    if (!newItem.category || !newItem.amount) {
      toast.error("Please fill in both category and amount.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/budget", {
        category: newItem.category,
        amount: parseFloat(newItem.amount),
      });
      setBudgetItems([...budgetItems, response.data]);
      toast.success("Item added successfully.");
      closePopup();
    } catch (error) {
      toast.error("Error adding new budget item.");
    }
  };

  const handleEditItem = (id) => {
    const itemToEdit = budgetItems.find((item) => item.id === id);
    setNewItem(itemToEdit);
    setCurrentItemId(id);
    setIsEditing(true);
    setShowPopup(true);
  };

  const handleUpdateItem = async () => {
    if (!newItem.category || !newItem.amount) {
      toast.error("Please fill in both category and amount.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/budget/${currentItemId}`, {
        category: newItem.category,
        amount: parseFloat(newItem.amount),
      });
      setBudgetItems(budgetItems.map((item) =>
        item.id === currentItemId ? response.data : item
      ));
      toast.success("Item updated successfully.");
      closePopup();
    } catch (error) {
      toast.error("Error updating budget item.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setIsEditing(false);
    setNewItem({ category: "", amount: "" });
    setCurrentItemId(null);
  };

  const chartData = {
    labels: budgetItems.map((item) => item.category),
    datasets: [
      {
        data: budgetItems.map((item) => item.amount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF4384", "#36A2BC", "#FFC107"],
      },
    ],
  };

  const categoryOptions = ["Medicine", "Electronics", "Groceries"];

  return (
    <div className="inventory-container">
      <Sidebar />
      <div className="content">
        <h1>Budget Management</h1>

        <div className="chart-container">
          <h2>Budget Breakdown</h2>
          <Pie data={chartData} />
        </div>

        <div className="inventory-box">
          {budgetItems.length === 0 ? (
            <div className="no-items">No budget items found.</div>
          ) : (
            budgetItems.map((item) => (
              <div key={item.id} className="inventory-item">
                <h2>{item.category}</h2>
                <p>Amount: ${item.amount}</p>
                <div className="actions">
                  <button className="edit" onClick={() => handleEditItem(item.id)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        <button className="add-button" onClick={() => setShowPopup(true)}>+</button>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>{isEditing ? "Edit Budget Item" : "Add New Budget Item"}</h2>
              <div className="form-group">
                <label>Category:</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Amount:</label>
                <input
                  type="number"
                  placeholder="Amount"
                  value={newItem.amount}
                  onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                  required
                />
              </div>
              <div className="popup-actions">
                <button onClick={isEditing ? handleUpdateItem : handleAddNewItem}>
                  {isEditing ? "Update" : "Add"}
                </button>
                <button className="close-btn" onClick={closePopup}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default BudgetPage;
