import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/budget.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPage = () => {
  const [budgetItems, setBudgetItems] = useState([
    { id: 1, category: "Groceries", amount: 200 },
    { id: 2, category: "Electronics", amount: 500 },
  ]);

  const handleDelete = (id) => {
    setBudgetItems(budgetItems.filter((item) => item.id !== id));
  };

  // Prepare data for the pie chart
  const chartData = {
    labels: budgetItems.map((item) => item.category),
    datasets: [
      {
        data: budgetItems.map((item) => item.amount),
        backgroundColor: ["#FF6384", "#36A2EB"], // Customize colors
        hoverBackgroundColor: ["#FF4384", "#36A2BC"], // Hover colors
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
                  <Link to={`/update-budget/${item.id}`}>
                    <button className="update">Update</button>
                  </Link>
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
