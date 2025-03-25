import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import AddItemModal from "../inventory/AddItemModal"; 
import UpdateItemModal from "../inventory/UpdateItemModal";
import "../styles/Groceries.css";

const InventoryPage = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/inventory")
      .then((response) => {
        setInventoryItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory items:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/inventory/${id}`)
      .then(() => {
        setInventoryItems(inventoryItems.filter((item) => item.id !== id));
        console.log(`Item with id ${id} deleted`);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  // Filter items based on search term
  const filteredItems = inventoryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-container">
      <Sidebar />
      <div className="content">
        <h1>Groceries List</h1>
        <div className="search-report-container">
          <input
            type="text"
            placeholder="Search items..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="download-report">Download Report</button>
        </div>
        <div className="inventory-box">
          {filteredItems.length === 0 ? (
            <p className="no-items animate">No items found.</p>
          ) : (
            filteredItems.map((item) => (
              <div className="inventory-item" key={item.id}>
                <h2>{item.name}</h2>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Expiration Date:</strong> {item.expirationDate}</p>
                <div className="actions">
                  <button
                    className="update"
                    onClick={() => {
                      setSelectedItem(item);
                      setShowUpdateModal(true);
                    }}
                  >Update</button>
                  <button onClick={() => handleDelete(item.id)} className="delete">
                    Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <button className="add-item-btn" onClick={() => setShowAddModal(true)}>+</button>

      {showAddModal && <AddItemModal showModal={showAddModal} closeModal={() => setShowAddModal(false)} />}

      {showUpdateModal && selectedItem && (
        <UpdateItemModal 
          showModal={showUpdateModal} 
          closeModal={() => setShowUpdateModal(false)} 
          item={selectedItem} 
          setInventoryItems={setInventoryItems} 
        />
      )}
    </div>
  );
};

export default InventoryPage;
