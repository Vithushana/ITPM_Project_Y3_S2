import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/Groceries.css";

const InventoryPage = () => {
  const inventoryItems = [
    { id: 1, name: "Milk", quantity: 10, category: "Dairy", expirationDate: "2025-03-01" },
    { id: 2, name: "Eggs", quantity: 20, category: "Dairy", expirationDate: "2025-04-01" },
    { id: 1, name: "Milk", quantity: 10, category: "Dairy", expirationDate: "2025-03-01" },
    { id: 1, name: "Milk", quantity: 10, category: "Dairy", expirationDate: "2025-03-01" },
    { id: 1, name: "Milk", quantity: 10, category: "Dairy", expirationDate: "2025-03-01" },
    { id: 1, name: "Milk", quantity: 10, category: "Dairy", expirationDate: "2025-03-01" },
  ];

  const handleDelete = (id) => {
    console.log(`Item with id ${id} deleted`);
  };

  return (
    <div className="inventory-container">
      <Sidebar />

      <div className="content">
        <h1>Groceries List</h1>
        <div className="inventory-box">
          {inventoryItems.length === 0 ? (
            <p className="no-items">No items found.</p>
          ) : (
            inventoryItems.map((item) => (
              <div className="inventory-item" key={item.id}>
                <h2>{item.name}</h2>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Expiration Date:</strong> {item.expirationDate}</p>
                <div className="actions">
                  <Link to={`/update-item/${item.id}`}>
                    <button className="update">Update</button>
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="delete">
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

export default InventoryPage;
