import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/electronic.css"; // Import the CSS file

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
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Expiration Date</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {electronicsItems.length === 0 ? (
              <tr>
                <td colSpan="6">No electronics found.</td>
              </tr>
            ) : (
              electronicsItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.category}</td>
                  <td>{item.expirationDate}</td>
                  <td>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(item.id, e)} />
                    {item.image && <img src={item.image} alt={item.name} className="preview-image" />}
                  </td>
                  <td>
                    <Link to={`/update-electronic/${item.id}`}>
                      <button className="update-btn">Update</button>
                    </Link>
                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
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

export default ElectronicsPage;
