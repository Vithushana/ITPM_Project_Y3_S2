import React, { useState } from "react";
import axios from "axios";
import "../styles/Modal.css"; 

const UpdateItemModal = ({ showModal, closeModal, item, setInventoryItems }) => {
  const [updatedItem, setUpdatedItem] = useState({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    category: item.category,
    expirationDate: item.expirationDate,
  });

  const handleChange = (e) => {
    setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); axios.put(`http://localhost:8080/api/inventory/${updatedItem.id}`, updatedItem)
      .then((response) => {
        setInventoryItems((prevItems) =>
          prevItems.map((i) => (i.id === item.id ? response.data : i))
        );
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <h2>Update Item</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={updatedItem.name} onChange={handleChange} required />

          <label>Quantity:</label>
          <input type="number" name="quantity" value={updatedItem.quantity} onChange={handleChange} required />

          <label>Category:</label>
          <input type="text" name="category" value={updatedItem.category} onChange={handleChange} required />

          <label>Expiration Date:</label>
          <input type="date" name="expirationDate" value={updatedItem.expirationDate} onChange={handleChange} required />

          <div className="modal-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItemModal;
