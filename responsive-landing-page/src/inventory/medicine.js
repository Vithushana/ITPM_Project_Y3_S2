import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/medicine.css"; // Import the CSS file

const MedicinePage = () => {
  const medicineItems = [
    { id: 1, name: "Paracetamol", quantity: 50, category: "Pain Relief", expirationDate: "2026-05-10" },
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
        <table className="medicine-table">
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
            {medicineItems.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">No medicines found.</td>
              </tr>
            ) : (
              medicineItems.map(medicine => (
                <tr key={medicine.id}>
                  <td>{medicine.name}</td>
                  <td>{medicine.quantity}</td>
                  <td>{medicine.category}</td>
                  <td>{medicine.expirationDate}</td>
                  <td>
                    <Link to={`/update-medicine/${medicine.id}`}>
                      <button className="update-btn">Update</button>
                    </Link>
                    <button className="delete-btn" onClick={() => handleDelete(medicine.id)}>Delete</button>
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

export default MedicinePage;
