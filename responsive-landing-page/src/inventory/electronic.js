import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/electronics")
      .then((response) => {
        setElectronicsItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch electronics data.");
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/electronics/${id}`);
      if (response.status === 200) {
        setElectronicsItems((prevItems) => prevItems.filter((item) => item.id !== id));
        toast.success("Item deleted successfully.");
      } else {
        throw new Error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting item.");
    }
  };

  const handleAddNewItem = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/electronics", newItem);
      if (response.status === 201) {
        setElectronicsItems((prevItems) => [...prevItems, response.data]);
        toast.success("Item added successfully.");
        closePopup();
      } else {
        throw new Error("Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Error adding item.");
    }
  };

  const handleEditItem = (id) => {
    const itemToEdit = electronicsItems.find((item) => item.id === id);
    if (!itemToEdit) return;
    setNewItem(itemToEdit);
    setCurrentItemId(id);
    setIsEditing(true);
    setShowPopup(true);
  };

  const handleUpdateItem = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/electronics/${currentItemId}`, newItem);
      if (response.status === 200) {
        setElectronicsItems((prevItems) =>
          prevItems.map((item) => (item.id === currentItemId ? response.data : item))
        );
        toast.success("Item updated successfully.");
        closePopup();
      } else {
        throw new Error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Error updating item.");
    }
  };

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

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleDownloadReport = () => {
    if (electronicsItems.length === 0) {
      toast.info("No data available to download.");
      return;
    }

    const headers = ["ID", "Name", "Quantity", "Category", "Expiration Date"];
    const rows = electronicsItems.map((item) =>
      [item.id, item.name, item.quantity, item.category, item.expirationDate].join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "electronics_report.csv";
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Report downloaded successfully.");
  };

  const filteredItems = categoryFilter
    ? electronicsItems.filter((item) =>
        item.category.toLowerCase().includes(categoryFilter.toLowerCase())
      )
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
          <button className="download-report" onClick={handleDownloadReport}>
            Download Report
          </button>
        </div>

        <div className="electronics-grid">
          {filteredItems.length === 0 ? (
            <p>No electronics found.</p>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="electronics-card">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="electronics-image"
                  />
                )}
                <h3>{item.name}</h3>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Expiration Date:</strong> {item.expirationDate}</p>
                <div className="button-group">
                  <button className="edit-btn" onClick={() => handleEditItem(item.id)}>
                    Update
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
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
              type="text"
              placeholder="Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
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

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ElectronicsPage;
