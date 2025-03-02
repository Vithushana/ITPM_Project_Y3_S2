import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/Groceries.css";

const InventoryPage = () => {
  const inventoryItems = [
    { id: 1, name: "Milk", quantity: 10, category: "Dairy", expirationDate: "2025-03-01" },
    { id: 2, name: "Eggs", quantity: 20, category: "Dairy", expirationDate: "2025-04-01" },
  ];

  const handleDelete = (id) => {
    console.log(`Item with id ${id} deleted`);
  };

  return (
    <div className="inventory-container">
      <Sidebar />

      <div className="content">
        <h1>Groceries List</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Expiration Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.length === 0 ? (
              <tr>
                <td colSpan="5">No items found.</td>
              </tr>
            ) : (
              inventoryItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.category}</td>
                  <td>{item.expirationDate}</td>
                  <td>
                    <Link to={`/update-item/${item.id}`}>
                      <button className="update">Update</button>
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="delete"
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

export default InventoryPage;
