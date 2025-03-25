import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/electronic.css";

const ElectronicsPage = () => {
  const [electronicsItems, setElectronicsItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    category: "",
    expirationDate: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/electronics")
      .then((response) => response.json())
      .then((data) => setElectronicsItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/electronics/${id}`, { method: "DELETE" })
      .then(() => setElectronicsItems(electronicsItems.filter(item => item.id !== id)))
      .catch(error => console.error("Error deleting:", error));
  };

  const handleAddNewItem = () => {
    fetch("http://localhost:8080/api/electronics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((data) => {
        setElectronicsItems([...electronicsItems, data]);
        closePopup();
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const handleEditItem = (id) => {
    const itemToEdit = electronicsItems.find(item => item.id === id);
    setNewItem(itemToEdit);
    setCurrentItemId(id);
    setIsEditing(true);
    setShowPopup(true);
  };

  const handleUpdateItem = () => {
    fetch(`http://localhost:8080/api/electronics/${currentItemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        setElectronicsItems(electronicsItems.map(item => item.id === currentItemId ? updatedItem : item));
        closePopup();
      })
      .catch((error) => console.error("Error updating item:", error));
  };

  const closePopup = () => {
    setShowPopup(false);
    setIsEditing(false);
    setNewItem({ name: "", quantity: "", category: "", expirationDate: "", imageUrl: "" });
    setCurrentItemId(null);
  };

  return (
    <div className="inventory-container">
      <Sidebar />
      <div className="content">
        <h1>Electronics List</h1>
        <div className="search-report-container">
          <input
            type="text"
            placeholder="Search items..."
            className="search-bar"
          />
          <button className="download-report">Download Report</button>
        </div>
        <div className="electronics-grid">
          {electronicsItems.length === 0 ? (
            <p>No electronics found.</p>
          ) : (
            electronicsItems.map(item => (
              <div key={item.id} className="electronics-card">
                <h3>{item.name}</h3>
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Expiration Date:</strong> {item.expirationDate}</p>
                {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="electronics-image" />}
                <div className="button-group">
                  <button className="edit-btn" onClick={() => handleEditItem(item.id)}>Update</button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <button className="add-button" onClick={() => setShowPopup(true)}>+</button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{isEditing ? "Edit Electronic" : "Add New Electronic"}</h2>
            <input type="text" placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
            <input type="number" placeholder="Quantity" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} />
            <input type="text" placeholder="Category" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} />
            <input type="date" placeholder="Expiration Date" value={newItem.expirationDate} onChange={(e) => setNewItem({ ...newItem, expirationDate: e.target.value })} />
            <input type="text" placeholder="Image URL" value={newItem.imageUrl} onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })} />
            
            <button onClick={isEditing ? handleUpdateItem : handleAddNewItem}>
              {isEditing ? "Update" : "Add"}
            </button>
            <button className="close-btn" onClick={closePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectronicsPage;
