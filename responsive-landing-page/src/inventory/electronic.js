import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/electronic.css";

const ElectronicsPage = () => {
  const [electronicsItems, setElectronicsItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [newItem, setNewItem] = useState({
    imageUrl: "",
    name: "",
    quantity: "",
    category: "",
    expirationDate: "",
  });

  // Fetch electronics items on component mount
  useEffect(() => {
    fetch("http://localhost:8080/api/electronics")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Electronics:", data);
        setElectronicsItems(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle delete functionality
  const handleDelete = async (id) => {
    console.log("Deleting item with ID:", id);
    try {
      const response = await fetch(`http://localhost:8080/api/electronics/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setElectronicsItems((prevItems) => prevItems.filter((item) => item.id !== id));
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle adding a new electronic item
  const handleAddNewItem = async () => {
    console.log("Adding new item:", newItem);
    try {
      const response = await fetch("http://localhost:8080/api/electronics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      const data = await response.json();
      setElectronicsItems((prevItems) => [...prevItems, data]);
      console.log("Item added successfully:", data);
      closePopup();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Handle editing an existing item
  const handleEditItem = (id) => {
    console.log("Editing item with ID:", id);
    const itemToEdit = electronicsItems.find((item) => item.id === id);
    if (!itemToEdit) return;
    setNewItem(itemToEdit);
    setCurrentItemId(id);
    setIsEditing(true);
    setShowPopup(true);
  };

  // Handle updating an item
  const handleUpdateItem = async () => {
    console.log("Updating item:", currentItemId, newItem);
    try {
      const response = await fetch(`http://localhost:8080/api/electronics/${currentItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) {
        throw new Error("Failed to update item");
      }
      const updatedItem = await response.json();
      setElectronicsItems((prevItems) =>
        prevItems.map((item) => (item.id === currentItemId ? updatedItem : item))
      );
      console.log("Item updated successfully:", updatedItem);
      closePopup();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Close popup and reset fields
  const closePopup = () => {
    setShowPopup(false);
    setIsEditing(false);
    setNewItem({
      imageUrl: "",
      name: "",
      quantity: "",
      category: "",
      expirationDate: "",
    });
    setCurrentItemId(null);
  };

  return (
    <div className="inventory-container">
      <Sidebar />
      <div className="content">
        <h1>Electronics List</h1>
        <div className="search-report-container">
          <input type="text" placeholder="Search items..." className="search-bar" />
          <button className="download-report">Download Report</button>
        </div>

        <div className="electronics-grid">
          {electronicsItems.length === 0 ? (
            <p>No electronics found.</p>
          ) : (
            electronicsItems.map((item) => (
              <div key={item.id} className="electronics-card">
                {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="electronics-image" />}
                <h3>{item.name}</h3>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Expiration Date:</strong> {item.expirationDate}</p>
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
            <input type="text" placeholder="Image URL" value={newItem.imageUrl} onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })} />
            <input type="number" placeholder="Quantity" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} />
            <input type="text" placeholder="Category" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} />
            <input type="date" placeholder="Expiration Date" value={newItem.expirationDate} onChange={(e) => setNewItem({ ...newItem, expirationDate: e.target.value })} />
            
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
