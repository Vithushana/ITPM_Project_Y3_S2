import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/medicine.css";

const MedicinePage = () => {
  const [medicineItems, setMedicineItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // For showing the popup
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    quantity: "",
    category: "",
    expirationDate: "",
  });

  // Fetch medicines from API
  useEffect(() => {
    fetch("http://localhost:8080/api/medicine")
      .then((response) => response.json())
      .then((data) => setMedicineItems(data))
      .catch((error) => console.error("Error fetching medicines:", error));
  }, []);

  // Handle delete medicine
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/medicine/${id}`, { method: "DELETE" })
      .then(() => setMedicineItems(medicineItems.filter((item) => item.id !== id)))
      .catch((error) => console.error("Error deleting medicine:", error));
  };

  // Handle adding new medicine
  const handleAddNewMedicine = () => {
    fetch("http://localhost:8080/api/medicine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMedicine),
    })
      .then((response) => response.json())
      .then((data) => {
        setMedicineItems([...medicineItems, data]);
        setShowPopup(false); // Close the popup after adding
        setNewMedicine({
          name: "",
          quantity: "",
          category: "",
          expirationDate: "",
        }); // Reset form
      })
      .catch((error) => console.error("Error adding medicine:", error));
  };

  return (
    <div className="inventory-container">
      <Sidebar />
      <div className="content">
        <h1 className="title">Medicine List</h1>
        <div className="search-report-container">
          <input
            type="text"
            placeholder="Search items..."
            className="search-bar"
          />
          <button className="download-report">Download Report</button>
        </div>
        <div className="medicine-container">
          {medicineItems.length === 0 ? (
            <div className="no-data">No medicines found.</div>
          ) : (
            medicineItems.map((medicine) => (
              <div className="medicine-box" key={medicine.id}>
                <div className="medicine-info">
                  <p><strong>Name:</strong> {medicine.name}</p>
                  <p><strong>Quantity:</strong> {medicine.quantity}</p>
                  <p><strong>Category:</strong> {medicine.category}</p>
                  <p><strong>Expiration Date:</strong> {medicine.expirationDate}</p>
                </div>
                <div className="medicine-actions">
                  <Link to={`/update-medicine/${medicine.id}`}>
                    <button className="update-btn">Update</button>
                  </Link>
                  <button className="delete-btn" onClick={() => handleDelete(medicine.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add New Medicine Button */}
        <button className="add-button" onClick={() => setShowPopup(true)}>+</button>

        {/* Popup Form for Adding New Medicine */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Add New Medicine</h2>
              <input
                type="text"
                placeholder="Name"
                value={newMedicine.name}
                onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newMedicine.quantity}
                onChange={(e) => setNewMedicine({ ...newMedicine, quantity: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category"
                value={newMedicine.category}
                onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })}
              />
              <input
                type="date"
                placeholder="Expiration Date"
                value={newMedicine.expirationDate}
                onChange={(e) => setNewMedicine({ ...newMedicine, expirationDate: e.target.value })}
              />
              <button onClick={handleAddNewMedicine}>Add</button>
              <button className="close-btn" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicinePage;
