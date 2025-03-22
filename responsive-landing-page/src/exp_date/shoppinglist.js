import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/shopping.css";

const ShoppingList = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({});

  const [electronicsList, setElectronicsList] = useState([]);
  const [groceriesList, setGroceriesList] = useState([]);
  const [medicinesList, setMedicinesList] = useState([]);
  const [moneyBalanceList, setMoneyBalanceList] = useState([]);

  const categories = [
    { name: "Electronics", fields: ["Name", "Date", "Count"] },
    { name: "Groceries", fields: ["Name", "Quantity", "Price"] },
    { name: "Medicines", fields: ["Name", "Quantity", "Type"] },
    { name: "Balance Money", fields: ["Amount", "Date", "Note"] },
  ];

  const handleBack = () => navigate("/home");

  const togglePopup = (category = null) => {
    setShowPopup(!showPopup);
    setSelectedCategory(category);
    setFormData({});
  };

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // Fetch data when component mounts
  const fetchData = () => {
    categories.forEach((category) => {
      fetch(`http://localhost:8080/api/shopping/${category.name}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(`Fetched ${category.name}:`, data);

          switch (category.name) {
            case "Electronics":
              setElectronicsList(data);
              break;
            case "Groceries":
              setGroceriesList(data);
              break;
            case "Medicines":
              setMedicinesList(data);
              break;
            case "Balance Money":
              setMoneyBalanceList(data);
              break;
            default:
              break;
          }
        })
        .catch((error) =>
          console.error(`Error fetching ${category.name}:`, error)
        );
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = () => {
    if (!selectedCategory) return;

    const newItem = { category: selectedCategory, ...formData };

    fetch("http://localhost:8080/api/shopping/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Saved Item:", data); // Debugging

        // Refetch data to update frontend
        fetchData();
      })
      .catch((error) => console.error("Error saving item:", error));

    setShowPopup(false);
  };

  return (
    <div className="App">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>
          ← Back Home
        </button>
      </div>

      <div className="banner">
        <div className="banner-text">
          <h1>Make Your Shopping Lists</h1>
          <p>🛒 Effortless Shopping, Smart Choices!</p>
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
                  {(() => {
                    let list =
                      category.name === "Electronics"
                        ? electronicsList
                        : category.name === "Groceries"
                        ? groceriesList
                        : category.name === "Medicines"
                        ? medicinesList
                        : moneyBalanceList;

                    return list.map((item, i) => (
                      <tr key={i}>
                        {category.fields.map((field, j) => (
                          <td key={j}>{item[field] || "N/A"}</td>
                        ))}
                      </tr>
                    ));
                  })()}
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
            {categories
              .find((cat) => cat.name === selectedCategory)
              ?.fields.map((field, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Enter ${field}`}
                  value={formData[field] || ""}
                  onChange={(e) => handleChange(e, field)}
                />
              ))}
            <div className="popup-actions">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => togglePopup()}>
                Cancel
              </button>
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
