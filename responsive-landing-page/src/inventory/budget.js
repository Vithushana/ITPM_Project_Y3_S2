import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/budget.css";

const BudgetPage = () => {
  const [budgetItems, setBudgetItems] = useState([
    { id: 1, category: "Groceries", amount: 200 },
    { id: 2, category: "Electronics", amount: 500 },
  ]);

  const handleDelete = (id) => {
    setBudgetItems(budgetItems.filter((item) => item.id !== id));
  };

  return (
    <div className="inventory-container">
      <Sidebar />
      <div className="content">
        <h1>Budget Management</h1>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgetItems.length === 0 ? (
              <tr>
                <td colSpan="3">No budget items found.</td>
              </tr>
            ) : (
              budgetItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.category}</td>
                  <td>${item.amount}</td>
                  <td>
                    <Link to={`/update-budget/${item.id}`}>
                      <button className="update-btn">Update</button>
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetPage;
