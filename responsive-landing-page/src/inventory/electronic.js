import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/electronic.css"; // Updated CSS for box layout

const ElectronicsPage = () => {
  const [electronicsItems, setElectronicsItems] = useState([
    { id: 1, name: "Laptop", quantity: 5, category: "Computers", expirationDate: "N/A", image: null },
    { id: 2, name: "Smartphone", quantity: 15, category: "Mobile", expirationDate: "N/A", image: null },
  ]);

  const handleDelete = (id) => {
    setElectronicsItems(electronicsItems.filter(item => item.id !== id));
    console.log(`Electronics item with id ${id} deleted`);
  };

  const handleImageUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedItems = electronicsItems.map(item =>
        item.id === id ? { ...item, image: URL.createObjectURL(file) } : item
      );
      setElectronicsItems(updatedItems);
    }
  };

  return (
    <div className="inventory-container">
      <Sidebar />
      <div className="content">
        <h1>Electronics List</h1>
        <div className="electronics-grid">
          {electronicsItems.length === 0 ? (
            <p>No electronics found.</p>
          ) : (
            electronicsItems.map(item => (
              <div key={item.id} className="electronics-card">
                <h3>{item.name}</h3>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Expiration Date:</strong> {item.expirationDate}</p>
                <div className="image-container">
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(item.id, e)} />
                  {item.image && <img src={item.image} alt={item.name} className="preview-image" />}
                </div>
                <div className="button-group">
                  <Link to={`/update-electronic/${item.id}`}>
                    <button className="update-btn">Update</button>
                  </Link>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectronicsPage;
