import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/medicine.css";

const MedicinePage = () => {
  const [medicineItems, setMedicineItems] = useState([]);
  const [filteredMedicine, setFilteredMedicine] = useState([]); // To store the filtered results
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  const [showPopup, setShowPopup] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    quantity: "",
    category: "",
    expirationDate: "",
  });

  const [updateMedicine, setUpdateMedicine] = useState({
    id: "",
    name: "",
    quantity: "",
    category: "",
    expirationDate: "",
  });

  // Fetch medicines from API
  useEffect(() => {
    fetch("http://localhost:8080/api/medicine")
      .then((response) => response.json())
      .then((data) => {
        setMedicineItems(data);
        setFilteredMedicine(data); // Initially, show all medicines
      })
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
        setFilteredMedicine([...medicineItems, data]); // Update the filtered list as well
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

  // Handle update medicine
  const handleUpdateMedicine = () => {
    fetch(`http://localhost:8080/api/medicine/${updateMedicine.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateMedicine),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedItems = medicineItems.map((item) =>
          item.id === updateMedicine.id ? data : item
        );
        setMedicineItems(updatedItems);
        setFilteredMedicine(updatedItems); // Update the filtered list as well
        setShowPopup(false); 
        setUpdateMedicine({
          id: "",
          name: "",
          quantity: "",
          category: "",
          expirationDate: "",
        }); // Reset form
      })
      .catch((error) => console.error("Error updating medicine:", error));
  };

  // Handle search input change
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term === "") {
      setFilteredMedicine(medicineItems); // If no search term, show all medicines
    } else {
      const filtered = medicineItems.filter((medicine) =>
        medicine.name.toLowerCase().includes(term.toLowerCase()) // Case-insensitive search
      );
      setFilteredMedicine(filtered);
    }
  };

  const handleDownloadReport = () => {
    if (filteredMedicine.length === 0) {
      alert("No data available to download.");
      return;
    }
  
    // Define CSV column headers
    const headers = ["Name", "Quantity", "Category", "Expiration Date"];
  
    // Convert data to CSV format
    const csvRows = [
      headers.join(","), // Add headers
      ...filteredMedicine.map((medicine) =>
        [medicine.name, medicine.quantity, medicine.category, medicine.expirationDate].join(",")
      ),
    ];
  
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
  
    // Create a downloadable link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "medicine_report.csv");
  
    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up after download
  };
  

  return (
    <div className="inventory-container">
      <Sidebar />
      <div className="content">
        <h1 className="title">Medicine List</h1>
        <div className="search-report-container">
          <input
            type="text"
            placeholder="Search by name..."
            className="search-bar"
            value={searchTerm}
            onChange={handleSearch} // Call search handler on input change
          />
          <button className="download-report" onClick={handleDownloadReport} >Download Report</button>
        </div>
        <div className="medicine-container">
          {filteredMedicine.length === 0 ? (
            <div className="no-data">No medicines found.</div>
          ) : (
            filteredMedicine.map((medicine) => (
              <div className="medicine-box" key={medicine.id}>
                <div className="medicine-info">
                  <p><strong>Name:</strong> {medicine.name}</p>
                  <p><strong>Quantity:</strong> {medicine.quantity}</p>
                  <p><strong>Category:</strong> {medicine.category}</p>
                  <p><strong>Expiration Date:</strong> {medicine.expirationDate}</p>
                </div>
                <div className="medicine-actions">
                  <button
                    className="update-btn"
                    onClick={() => {
                      setUpdateMedicine(medicine);
                      setShowPopup(true); // Open the popup with medicine details
                    }}
                  >
                    Update
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(medicine.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add New Medicine Button */}
        <button className="add-button" onClick={() => setShowPopup(true)}>+</button>

        {/* Popup Form for Adding or Updating Medicine */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>{updateMedicine.id ? "Update Medicine" : "Add New Medicine"}</h2>
              <input
                type="text"
                placeholder="Name"
                value={updateMedicine.name || newMedicine.name}
                onChange={(e) =>
                  updateMedicine.id
                    ? setUpdateMedicine({ ...updateMedicine, name: e.target.value })
                    : setNewMedicine({ ...newMedicine, name: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Quantity"
                value={updateMedicine.quantity || newMedicine.quantity}
                onChange={(e) =>
                  updateMedicine.id
                    ? setUpdateMedicine({ ...updateMedicine, quantity: e.target.value })
                    : setNewMedicine({ ...newMedicine, quantity: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Category"
                value={updateMedicine.category || newMedicine.category}
                onChange={(e) =>
                  updateMedicine.id
                    ? setUpdateMedicine({ ...updateMedicine, category: e.target.value })
                    : setNewMedicine({ ...newMedicine, category: e.target.value })
                }
              />
              <input
                type="date"
                placeholder="Expiration Date"
                value={updateMedicine.expirationDate || newMedicine.expirationDate}
                onChange={(e) =>
                  updateMedicine.id
                    ? setUpdateMedicine({ ...updateMedicine, expirationDate: e.target.value })
                    : setNewMedicine({ ...newMedicine, expirationDate: e.target.value })
                }
              />
              <button onClick={updateMedicine.id ? handleUpdateMedicine : handleAddNewMedicine}>
                {updateMedicine.id ? "Update" : "Add"}
              </button>
              <button className="close-btn" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicinePage;
