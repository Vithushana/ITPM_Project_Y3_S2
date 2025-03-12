import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/medicine.css"; // Import the CSS file

const MedicinePage = () => {
  const medicineItems = [
    { id: 1, name: "Paracetamol", quantity: 50, category: "Pain Relief", expirationDate: "2026-05-10" },
    { id: 2, name: "Amoxicillin", quantity: 30, category: "Antibiotic", expirationDate: "2025-12-15" },
    { id: 2, name: "Amoxicillin", quantity: 30, category: "Antibiotic", expirationDate: "2025-12-15" },
    { id: 2, name: "Amoxicillin", quantity: 30, category: "Antibiotic", expirationDate: "2025-12-15" },
  ];

  const handleDelete = (id) => {
    console.log(`Medicine with id ${id} deleted`);
  };

  return (
    <div className="inventory-container">
      <Sidebar />
      <div className="content">
        <h1 className="title">Medicine List</h1>
        <div className="medicine-container">
          {medicineItems.length === 0 ? (
            <div className="no-data">No medicines found.</div>
          ) : (
            medicineItems.map(medicine => (
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
      </div>
    </div>
  );
};

export default MedicinePage;
