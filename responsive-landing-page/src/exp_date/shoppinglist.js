import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/shopping.css";

const ShoppingList = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const [electronicsList, setElectronicsList] = useState([]);
  const [groceriesList, setGroceriesList] = useState([]);
  const [medicinesList, setMedicinesList] = useState([]);
  const [moneyBalanceList, setMoneyBalanceList] = useState([]);

  const categories = [
    { name: "Electronics", fields: ["Name", "Date", "Count"] },
    { name: "Groceries", fields: ["Name", "Quantity"] },
    { name: "Medicines", fields: ["Name", "Quantity", "Type"] },
    { name: "Balance Money", fields: ["Amount", "Date", "Note"] },
  ];

  const handleBack = () => navigate("/home");

  const togglePopup = (category = null) => {
    setShowPopup(!showPopup);
    setSelectedCategory(category);
    setFormData({});
    setFormErrors({});
  };

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const validateFormData = () => {
    let errors = {};
    const { Date, Count, Amount } = formData;
  
    // Validate Date format
    const datePattern = /^\d{4}-\d{2}-\d{2}$/; // Matches YYYY-MM-DD format
    if (selectedCategory === "Electronics" && Date && !datePattern.test(Date)) {
      errors.Date = "Date must be in the format YYYY-MM-DD.";
    }
  
    if (selectedCategory === "Electronics" && (isNaN(Count) || Count <= 0)) {
      errors.Count = "Count must be a valid number greater than 0.";
    }
  
    if ((selectedCategory === "Electronics" || selectedCategory === "Balance Money") && !Date) {
      errors.Date = "Date is required.";
    }
  
    if (selectedCategory === "Balance Money" && isNaN(Amount)) {
      errors.Amount = "Amount must be a valid number.";
    }
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSave = () => {
    if (!selectedCategory) return;

    if (!validateFormData()) {
      return; // Stop if validation fails
    }

    const newItem = { category: selectedCategory, ...formData };

    fetch("http://localhost:8080/api/shopping/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((data) => {
        switch (selectedCategory) {
          case "Electronics":
            setElectronicsList((prev) => [...prev, data]);
            break;
          case "Groceries":
            setGroceriesList((prev) => [...prev, data]);
            break;
          case "Medicines":
            setMedicinesList((prev) => [...prev, data]);
            break;
          case "Balance Money":
            setMoneyBalanceList((prev) => [...prev, data]);
            break;
          default:
            break;
        }
      })
      .catch((error) => console.error("Error saving item:", error));

    setShowPopup(false);
  };

  return (
    <div className="App">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>← Back Home</button>
      </div>

      <div className="banner">
        <div className="banner-text">
          <h1>Make Your Shopping Lists</h1>
          <p>🛒 Effortless Shopping, Smart Choices!</p>
          <div className="search">
          <input
            type="text"
            placeholder="Search items..."
            className="search-bar"
          />
          <button className="download-report">Download Report</button>
        </div>
        </div>
      </div>

      <div className="category-section">
        <h2>Category</h2>
        <div className="category-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <h3>🛒{category.name}</h3>
              <button className="add-btn" onClick={() => togglePopup(category.name)}>
                ➕ Add Item
              </button>

              <table className="category-table">
                <thead>
                  <tr>
                    {category.fields.map((field, i) => (
                      <th key={i}>{field}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {category.name === "Electronics" &&
                    electronicsList.map((item, i) => (
                      <tr key={i}>{category.fields.map((field, j) => <td key={j}>{item[field]}</td>)}</tr>
                    ))}
                  {category.name === "Groceries" &&
                    groceriesList.map((item, i) => (
                      <tr key={i}>{category.fields.map((field, j) => <td key={j}>{item[field]}</td>)}</tr>
                    ))}
                  {category.name === "Medicines" &&
                    medicinesList.map((item, i) => (
                      <tr key={i}>{category.fields.map((field, j) => <td key={j}>{item[field]}</td>)}</tr>
                    ))}
                  {category.name === "Balance Money" &&
                    moneyBalanceList.map((item, i) => (
                      <tr key={i}>{category.fields.map((field, j) => <td key={j}>{item[field]}</td>)}</tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>

      {showPopup && selectedCategory && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h2>Add New {selectedCategory} Item</h2>
            {categories.find((cat) => cat.name === selectedCategory)?.fields.map((field, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder={`Enter ${field}`}
                  value={formData[field] || ""}
                  onChange={(e) => handleChange(e, field)}
                />
                {formErrors[field] && <span className="error">{formErrors[field]}</span>}
              </div>
            ))}
            <div className="popup-actions">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => togglePopup()}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>Home-Zone</p>
      </footer>
    </div>
  );
};

export default ShoppingList;
