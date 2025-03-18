import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from 'axios';
import "../styles/budget.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPage = () => {
  const [budgetItems, setBudgetItems] = useState([]);

  useEffect(() => {
    const fetchBudgetItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/budget'); 
        setBudgetItems(response.data);
      } catch (error) {
        console.error("Error fetching budget items:", error);
      }
    };

    fetchBudgetItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/budget/${id}`); 
      setBudgetItems(budgetItems.filter((item) => item.id !== id)); 
    } catch (error) {
      console.error("Error deleting budget item:", error);
    }
  };

  const chartData = {
    labels: budgetItems.map((item) => item.category),
    datasets: [
      {
        data: budgetItems.map((item) => item.amount),
        backgroundColor: ["#FF6384", "#36A2EB"], 
        hoverBackgroundColor: ["#FF4384", "#36A2BC"], 
      },
    ],
  };

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
                  <button
                    className="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
