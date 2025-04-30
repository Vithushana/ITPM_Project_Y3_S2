import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/medicine.css";

const MedicinePage = () => {
  const [medicineItems, setMedicineItems] = useState([]);
  const [filteredMedicine, setFilteredMedicine] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    quantity: "",
    category: "",
    expirationDate: "",
    illnessType: "",
    available: true,
  });
  const [updateMedicine, setUpdateMedicine] = useState({
    id: "",
    name: "",
    quantity: "",
    category: "",
    expirationDate: "",
    available: true,
  });

  const [isAddingBySync, setIsAddingBySync] = useState(false);
  const [itemAddingBySync, setItemAddingBySync] = useState(null);

  const [shoppingData, setShoppingData] = useState([]);
  const [showSyncPopup, setShowSyncPopup] = useState(false);

  const categories = [
    "Antihistamine", 
    "Pain Reliever", 
    "Antibiotic", 
    "Oral Hypoglycemic", 
    "Vitamins", 
    "Cough & Cold", 
    "Antacids"
  ];

  const illnessTypes = [
    "Fever",
    "Pain",
    "Bacterial Infection",
    "Cough",
    "Diabetes",
    "Cold",
    "Flu",
    "Headache",
    "Asthma",
    "Hypertension",
    "Allergy",
    "Stomach Ache",
    "Skin Rash",
    "COVID-19",
    "Migraines",
    "Pneumonia",
    "Arthritis",
    "Anxiety",
    "Depression"
  ];
  

  useEffect(() => {
    fetch("http://localhost:8080/api/medicine")
      .then((response) => response.json())
      .then((data) => {
        setMedicineItems(data);
        setFilteredMedicine(data);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
        toast.error("Failed to fetch medicines.");
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/medicine/${id}`, { method: "DELETE" })
      .then(() => {
        const updated = medicineItems.filter((item) => item.id !== id);
        setMedicineItems(updated);
        setFilteredMedicine(updated);
        toast.success("Medicine deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting medicine:", error);
        toast.error("Error deleting medicine.");
      });
  };

  const handleAddNewMedicine = () => {
    fetch("http://localhost:8080/api/medicine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMedicine),
    })
      .then((response) => response.json())
      .then((data) => {
        const updated = [...medicineItems, data];
        setMedicineItems(updated);
        setFilteredMedicine(updated);
        setShowPopup(false);
        setNewMedicine({ name: "", quantity: "", category: "", expirationDate: "", illnessType: "" });
        toast.success("Medicine added successfully.");
        if(isAddingBySync){
          setShowSyncPopup(true);
          
          fetch(`http://localhost:8080/api/shopping/delete/${itemAddingBySync.id}`, {
                method: "DELETE",
              })
                .then((res) => {
                  if (res.ok) {
                    toast.success("Item deleted in Shopping also!");
                    setShoppingData(prevData => prevData.filter(item => item.id !== itemAddingBySync.id));
                  } else {
                    toast.error("Delete failed in Shopping");
                  }
                })
                .catch(() => toast.error("Server error during delete."));
        }
        setIsAddingBySync(false);
      })
      .catch((error) => {
        console.error("Error adding medicine:", error);
        toast.error("Error adding medicine.");
      });
  };

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
        setFilteredMedicine(updatedItems);
        setShowPopup(false);
        setUpdateMedicine({ id: "", name: "", quantity: "", category: "", expirationDate: "", illnessType: "" });
        toast.success("Medicine updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating medicine:", error);
        toast.error("Error updating medicine.");
      });
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredMedicine(medicineItems);
    } else {
      const filtered = medicineItems.filter((medicine) =>
        medicine.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredMedicine(filtered);
    }
  };

  const handleDownloadReport = () => {
    if (filteredMedicine.length === 0) {
      toast.info("No data available to download.");
      return;
    }

    const headers = ["Name", "Quantity", "Category", "Expiration Date"];
    const csvRows = [
      headers.join(","),
      ...filteredMedicine.map((medicine) =>
        [medicine.name, medicine.quantity, medicine.category, medicine.expirationDate].join(",")
      ),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "medicine_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Report downloaded successfully.");
  };

  const handleSyncItem = (item) => {
    console.log(item);
    setShowSyncPopup(false);
    setShowPopup(true);
    const quantity = item.quantity ? parseInt(item.quantity.split(' ')[0], 10) : 0;
    setNewMedicine({
      name: item.name || "",
      quantity: quantity,
    });
    setIsAddingBySync(true);
    setItemAddingBySync(item);
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
            onChange={handleSearch}
          />
          <button className="download-report" onClick={handleDownloadReport}>
            Download Report
          </button>
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
                  <p><strong>IllnessType:</strong> {medicine.expirationDate}</p>
                  <p><strong>Available:</strong> {medicine.expirationDate}</p>
                </div>
                <div className="medicine-actions">
                  <button
                    className="update-btn"
                    onClick={() => {
                      setUpdateMedicine(medicine);
                      setShowPopup(true);
                    }}
                  >
                    Update
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(medicine.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="floating-buttons-1">
          <button
            className="add-button-1"
            onClick={() => {
              setShowPopup(true);
              setUpdateMedicine({ id: "", name: "", quantity: "", category: "", expirationDate: "", illnessType: "" });
            }}
          >
            +
          </button>

          <button
            className="sync-button-1"
            onClick={async () => {
              try {
                const response = await fetch("http://localhost:8080/api/shopping/MEDICINE");
                const data = await response.json();
                setShoppingData(data);
                setShowSyncPopup(true);
                // toast.success("Shopping data fetched successfully.");
              } catch (error) {
                console.error("Error fetching shopping data:", error);
                toast.error("Failed to fetch shopping data.");
              }
            }}
          >
            ⟳
          </button>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>{updateMedicine.id ? "Update Medicine" : "Add New Medicine"}</h2>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={updateMedicine.id ? updateMedicine.name : newMedicine.name}
                  onChange={(e) =>
                    updateMedicine.id
                      ? setUpdateMedicine({ ...updateMedicine, name: e.target.value })
                      : setNewMedicine({ ...newMedicine, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  placeholder="Quantity"
                  value={updateMedicine.id ? updateMedicine.quantity : newMedicine.quantity}
                  onChange={(e) =>
                    updateMedicine.id
                      ? setUpdateMedicine({ ...updateMedicine, quantity: e.target.value })
                      : setNewMedicine({ ...newMedicine, quantity: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="category-dropdown"
                  value={updateMedicine.id ? updateMedicine.category : newMedicine.category}
                  onChange={(e) =>
                    updateMedicine.id
                      ? setUpdateMedicine({ ...updateMedicine, category: e.target.value })
                      : setNewMedicine({ ...newMedicine, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="expirationDate">Expiration Date</label>
                <input
                  id="expirationDate"
                  type="date"
                  placeholder="Expiration Date"
                  value={updateMedicine.id ? updateMedicine.expirationDate : newMedicine.expirationDate}
                  onChange={(e) =>
                    updateMedicine.id
                      ? setUpdateMedicine({ ...updateMedicine, expirationDate: e.target.value })
                      : setNewMedicine({ ...newMedicine, expirationDate: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="illnessType">Illness Type</label>
                <select
                  id="illnessType"
                  className="illnessType-dropdown"
                  value={updateMedicine.id ? updateMedicine.illnessType : newMedicine.illnessType}
                  onChange={(e) =>
                    updateMedicine.id
                      ? setUpdateMedicine({ ...updateMedicine, illnessType: e.target.value })
                      : setNewMedicine({ ...newMedicine, illnessType: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {illnessTypes.map((illnessType, index) => (
                    <option key={index} value={illnessType}>
                      {illnessType}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={updateMedicine.id ? handleUpdateMedicine : handleAddNewMedicine}>
                {updateMedicine.id ? "Update" : "Add"}
              </button>
              <button className="close-btn" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        )}

        {showSyncPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Shopping Medicine List</h2>
              {shoppingData.length === 0 ? (
                <p>No shopping data available.</p>
              ) : (
                <table className="shopping-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shoppingData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>
                          <button 
                            className="add-btn" 
                            onClick={() => handleSyncItem(item)}>
                            Add
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <button className="close-btn" onClick={() => setShowSyncPopup(false)}>Close</button>
            </div>
          </div>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default MedicinePage;
