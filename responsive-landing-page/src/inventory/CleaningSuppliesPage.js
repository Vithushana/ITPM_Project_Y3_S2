// src/pages/CleaningSuppliesPage.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/CleaningSupplies.css";

const CleaningSuppliesPage = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", expirationDate: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get("http://localhost:8080/api/cleaning-supplies")
      .then((res) => setItems(res.data))
      .catch(() => toast.error("Failed to load items."));
  };

  const handleAdd = () => {
    axios
      .post("http://localhost:8080/api/cleaning-supplies", newItem)
      .then(() => {
        toast.success("Item added.");
        setShowPopup(false);
        setNewItem({ name: "", quantity: "", expirationDate: "" });
        fetchItems();
      })
      .catch(() => toast.error("Add failed."));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/cleaning-supplies/${id}`)
      .then(() => {
        toast.success("Deleted.");
        fetchItems();
      })
      .catch(() => toast.error("Delete failed."));
  };

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = () => {
    if (filtered.length === 0) return toast.info("No data.");
    let csv = "Name,Quantity,Expiration Date\n";
    filtered.forEach((i) => {
      csv += `${i.name},${i.quantity},${i.expirationDate}\n`;
    });
    saveAs(new Blob([csv], { type: "text/csv;charset=utf-8;" }), "cleaning_supplies.csv");
    toast.success("Downloaded.");
  };

  return (
    <div className="inventory-container">
      <Sidebar />
      <div className="content">
        <h1>Cleaning Supplies</h1>
        <input
          className="search-bar"
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="electronics-grid">
          {filtered.map((item) => (
            <div className="electronics-card" key={item.id}>
              <h3>{item.name}</h3>
              <p>Qty: {item.quantity}</p>
              <p>Expires: {item.expirationDate}</p>
              <div className="button-group">
                <button className="edit-btn" onClick={() => {
                  setNewItem(item);
                  setShowPopup(true);
                }}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <button className="add-button" onClick={() => setShowPopup(true)}>+</button>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>{newItem.id ? "Update Item" : "Add New Item"}</h3>
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
                type="date"
                value={newItem.expirationDate}
                onChange={(e) => setNewItem({ ...newItem, expirationDate: e.target.value })}
              />
              <button onClick={handleAdd}>{newItem.id ? "Update" : "Add"}</button>
              <button className="close-btn" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CleaningSuppliesPage;
