import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios"; // Import axios for API requests
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
  const [categoryFilter, setCategoryFilter] = useState(""); // State for category filter

  // Fetch electronics items on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/electronics")
      .then((response) => {
        setElectronicsItems(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle delete functionality using axios
  const handleDelete = async (id) => {
    console.log("Deleting item with ID:", id);
    try {
      const response = await axios.delete(`http://localhost:8080/api/electronics/${id}`);
      if (response.status === 200) {
        setElectronicsItems((prevItems) => prevItems.filter((item) => item.id !== id));
        console.log("Item deleted successfully");
      } else {
        throw new Error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle adding a new electronic item
  const handleAddNewItem = async () => {
    console.log("Adding new item:", newItem);
    try {
      const response = await axios.post("http://localhost:8080/api/electronics", newItem);
      if (response.status === 201) {
        setElectronicsItems((prevItems) => [...prevItems, response.data]);
        console.log("Item added successfully:", response.data);
        closePopup();
      } else {
        throw new Error("Failed to add item");
      }
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

  // Handle updating an item using axios
  const handleUpdateItem = async () => {
    console.log("Updating item:", currentItemId, newItem);
    try {
      const response = await axios.put(`http://localhost:8080/api/electronics/${currentItemId}`, newItem);
      if (response.status === 200) {
        setElectronicsItems((prevItems) =>
          prevItems.map((item) => (item.id === currentItemId ? response.data : item))
        );
        console.log("Item updated successfully:", response.data);
        closePopup();
      } else {
        throw new Error("Failed to update item");
      }
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

  // Handle category filter change
  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  // Filter items by category
  const filteredItems = categoryFilter
    ? electronicsItems.filter((item) => item.category.toLowerCase().includes(categoryFilter.toLowerCase()))
    : electronicsItems;

  return (
    <div className="inventory-container">
      <Sidebar />
      <div className="content">
        <h1>Electronics List</h1>
        <div className="search-report-container">
          <input
            type="text"
            placeholder="Search items by category..."
            className="search-bar"
            value={categoryFilter}
            onChange={handleCategoryChange}
          />
          <button className="download-report">Download Report</button>
        </div>

        <div className="electronics-grid">
          {filteredItems.length === 0 ? (
            <p>No electronics found.</p>
          ) : (
            filteredItems.map((item) => (
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
            <input
              type="text"
              placeholder="Image URL"
              value={newItem.imageUrl}
              onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            />
            <input
              type="date"
              placeholder="Expiration Date"
              value={newItem.expirationDate}
              onChange={(e) => setNewItem({ ...newItem, expirationDate: e.target.value })}
            />
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
