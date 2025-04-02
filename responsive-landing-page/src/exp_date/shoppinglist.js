import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/shopping.css";

const ShoppingList = () => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const [electronicsList, setElectronicsList] = useState([]);
  const [groceriesList, setGroceriesList] = useState([]);
  const [medicinesList, setMedicinesList] = useState([]);
  const [moneyBalanceList, setMoneyBalanceList] = useState([]);

  const getCategories = () => [
    { name: "ELECTRONICS", fields: ["name", "date", "count"] },
    { name: "GROCERIES", fields: ["name", "quantity"] },
    { name: "MEDICINE", fields: ["name", "quantity", "type"] },
    { name: "BALANCEMONEY", fields: ["amount", "date", "note"] },
  ];

  useEffect(() => {
    getCategories().forEach((category) => {
      fetch(`http://localhost:8080/api/shopping/${category.name}`)
        .then((res) => res.json())
        .then((data) => {
          switch (category.name) {
            case "ELECTRONICS":
              setElectronicsList(data);
              break;
            case "GROCERIES":
              setGroceriesList(data);
              break;
            case "MEDICINE":
              setMedicinesList(data);
              break;
            case "BALANCEMONEY":
              setMoneyBalanceList(data);
              break;
            default:
              break;
          }
        })
        .catch(() => {
          toast.error(`Failed to load ${category.name} items`);
        });
    });
  }, []);

  const handleBack = () => navigate("/home");

  const togglePopup = (category = null, item = null) => {
    setShowPopup(!showPopup);
    setSelectedCategory(category);
    setFormData(item || {});
    setFormErrors({});
  };

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const validateFormData = () => {
    let errors = {};
    const { date, count, amount } = formData;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (selectedCategory === "ELECTRONICS" && date && !datePattern.test(date)) {
      errors.date = "Date must be in the format YYYY-MM-DD.";
    }

    if (selectedCategory === "ELECTRONICS" && (isNaN(count) || count <= 0)) {
      errors.count = "Count must be a valid number greater than 0.";
    }

    if ((selectedCategory === "ELECTRONICS" || selectedCategory === "BALANCEMONEY") && !date) {
      errors.date = "Date is required.";
    }

    if (selectedCategory === "BALANCEMONEY" && isNaN(amount)) {
      errors.amount = "Amount must be a valid number.";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.warn("Please fix form errors before saving.");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!selectedCategory || !validateFormData()) return;

    const isEditing = !!formData._id;
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:8080/api/shopping/update/${formData._id}`
      : "http://localhost:8080/api/shopping/add";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: selectedCategory, ...formData }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(isEditing ? "Item updated!" : "Item added!");

        const updateList = (list, setList) => {
          if (isEditing) {
            setList(list.map((item) => (item._id === data._id ? data : item)));
          } else {
            setList([...list, data]);
          }
        };

        switch (selectedCategory) {
          case "ELECTRONICS":
            updateList(electronicsList, setElectronicsList);
            break;
          case "GROCERIES":
            updateList(groceriesList, setGroceriesList);
            break;
          case "MEDICINE":
            updateList(medicinesList, setMedicinesList);
            break;
          case "BALANCEMONEY":
            updateList(moneyBalanceList, setMoneyBalanceList);
            break;
          default:
            break;
        }
        setShowPopup(false);
      })
      .catch(() => toast.error("Save failed. Try again."));
  };

  const handleDelete = (id, categoryName) => {
    fetch(`http://localhost:8080/api/shopping/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Item deleted!");
          const updateList = (list, setList) =>
            setList(list.filter((item) => item._id !== id));

          switch (categoryName) {
            case "ELECTRONICS":
              updateList(electronicsList, setElectronicsList);
              break;
            case "GROCERIES":
              updateList(groceriesList, setGroceriesList);
              break;
            case "MEDICINE":
              updateList(medicinesList, setMedicinesList);
              break;
            case "BALANCEMONEY":
              updateList(moneyBalanceList, setMoneyBalanceList);
              break;
            default:
              break;
          }
        } else {
          toast.error("Delete failed.");
        }
      })
      .catch(() => toast.error("Server error during delete."));
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
              placeholder="Search List..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            <button className="download-report">Download Report</button>
          </div>
        </div>
      </div>

      <div className="category-section">
        <h2>Category</h2>
        <div className="category-grid">
          {getCategories().map((category, index) => {
            const list =
              category.name === "ELECTRONICS"
                ? electronicsList
                : category.name === "GROCERIES"
                ? groceriesList
                : category.name === "MEDICINE"
                ? medicinesList
                : moneyBalanceList;

            const filteredList = list.filter((item) =>
              category.fields.some((field) =>
                String(item[field] || "").toLowerCase().includes(searchTerm)
              )
            );

            return (
              <div key={index} className="category-item">
                <h3>🛒{category.name}</h3>
                <button className="add-btn" onClick={() => togglePopup(category.name)}>➕ Add Item</button>

                <table className="category-table">
                  <thead>
                    <tr>
                      {category.fields.map((field, i) => (
                        <th key={i}>{field.charAt(0).toUpperCase() + field.slice(1)}</th>
                      ))}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList.map((item, i) => (
                      <tr key={i} className="fade-in">
                        {category.fields.map((field, j) => (
                          <td key={j}>{item[field]}</td>
                        ))}
                        <td>
                          <button onClick={() => togglePopup(category.name, item)}>✏️</button>
                          <button onClick={() => handleDelete(item._id, category.name)}>🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>

      {showPopup && selectedCategory && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h2>{formData._id ? "Edit" : "Add"} {selectedCategory} Item</h2>
            {getCategories()
              .find((cat) => cat.name === selectedCategory)
              ?.fields.map((field, index) => (
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

      <ToastContainer position="top-right" autoClose={3000} />
      <footer><p>Home-Zone</p></footer>
    </div>
  );
};

export default ShoppingList;
