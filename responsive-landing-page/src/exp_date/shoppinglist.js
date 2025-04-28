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
  const [quantityTypeOptions, setQuantityTypeOptions] = useState([]);

  const [electronicsList, setElectronicsList] = useState([]);
  const [groceriesList, setGroceriesList] = useState([]);
  const [medicinesList, setMedicinesList] = useState([]);
  const [moneyBalanceList, setMoneyBalanceList] = useState([]);

  const getCategories = () => [
    { name: "ELECTRONICS", fields: ["name", "date", "count"] },
    { name: "GROCERIES", fields: ["name", "quantity"], quantityTypes: ["kg", "g", "L", "ml", "unit"] },
    { name: "MEDICINE", fields: ["name", "quantity", "type"], quantityTypes: ["tablets", "capsules", "ml", "g", "unit", "bottles"] },
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
        .catch(() => toast.error(`Failed to load ${category.name} items`));
    });
  }, []);

  const handleBack = () => navigate("/home");

  const togglePopup = (category = null, item = null) => {
    setShowPopup(!showPopup);
    setSelectedCategory(category);
    setFormData(item ? { ...item } : {});
    setFormErrors({});
    setQuantityTypeOptions(getCategories().find(c => c.name === category)?.quantityTypes || []);
  };

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleQuantityTypeChange = (e) => {
    setFormData({ ...formData, quantity: `${formData.quantity?.split(' ')[0] || ''} ${e.target.value}` });
  };

  const validateFormData = () => {
    let errors = {};
    const { name, date, count, quantity, amount, type } = formData;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (selectedCategory === "ELECTRONICS" && !name?.trim()) {
      errors.name = "Name is required.";
    }
    if (selectedCategory === "ELECTRONICS" && date && !datePattern.test(date)) {
      errors.date = "Date must be in the format<\ctrl98>-MM-DD.";
    }
    if (selectedCategory === "ELECTRONICS" && (isNaN(count) || Number(count) <= 0)) {
      errors.count = "Count must be a valid number greater than 0.";
    }

    if (selectedCategory === "GROCERIES" && !name?.trim()) {
      errors.name = "Name is required.";
    }
    if (selectedCategory === "GROCERIES") {
      const quantityParts = quantity?.split(' ');
      if (!quantity?.trim() || isNaN(quantityParts?.[0]) || Number(quantityParts?.[0]) <= 0 || !quantityParts?.[1]?.trim()) {
        errors.quantity = "Quantity must be a valid number followed by a unit (e.g., '1 kg').";
      }
    }

    if (selectedCategory === "MEDICINE" && !name?.trim()) {
      errors.name = "Name is required.";
    }
    if (selectedCategory === "MEDICINE") {
      const quantityParts = quantity?.split(' ');
      if (!quantity?.trim() || isNaN(quantityParts?.[0]) || Number(quantityParts?.[0]) <= 0 || !quantityParts?.[1]?.trim()) {
        errors.quantity = "Quantity must be a valid number followed by a unit (e.g., '10 tablets').";
      }
    }
    if (selectedCategory === "MEDICINE" && !type?.trim()) {
      errors.type = "Type is required.";
    }

    if (selectedCategory === "BALANCEMONEY" && (isNaN(amount))) {
      errors.amount = "Amount must be a valid number.";
    }
    if (selectedCategory === "BALANCEMONEY" && !date) {
      errors.date = "Date is required.";
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

    const isEditing = !!formData.id;
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:8080/api/shopping/update/${formData.id}`
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
            setList(list.map((item) => (item.id === data.id ? data : item)));
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
            setList(list.filter((item) => item.id !== id));

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

  const handleDownloadReport = () => {
    const allData = [
      { name: "ELECTRONICS", list: electronicsList, fields: ["name", "date", "count"] },
      { name: "GROCERIES", list: groceriesList, fields: ["name", "quantity"] },
      { name: "MEDICINE", list: medicinesList, fields: ["name", "quantity", "type"] },
      { name: "BALANCEMONEY", list: moneyBalanceList, fields: ["amount", "date", "note"] },
    ];

    let csv = "Category,";

    const uniqueHeaders = new Set();
    allData.forEach((cat) => cat.fields.forEach((f) => uniqueHeaders.add(f)));
    const headers = ["Category", ...Array.from(uniqueHeaders)];
    csv += headers.slice(1).join(",") + "\n";

    allData.forEach(({ name, list, fields }) => {
      const filtered = list.filter((item) =>
        fields.some((field) =>
          String(item[field] || "").toLowerCase().includes(searchTerm)
        )
      );

      filtered.forEach((item) => {
        const row = headers.map((field) =>
          field === "Category" ? name : item[field] || ""
        );
        csv += row.join(",") + "\n";
      });
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "shopping_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBack}>← Back Home</button>
      </div>

      <div className="banner">
        <div className="banner-text">
          <h1>Make Your Card Lists</h1>
          <p>🛒 Effortless Shopping, Smart Choices!</p>
          <div className="search">
            <input
              type="text"
              placeholder="Search List..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            <button className="download-report" onClick={handleDownloadReport}>
              Download Report
            </button>
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
                          <button onClick={() => handleDelete(item.id, category.name)}>🗑️</button>
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
            <h2>{formData.id ? "Edit" : "Add"} {selectedCategory} Item</h2>
            <div className="popup-form">
              {getCategories().find(c => c.name === selectedCategory)?.fields.map((field, idx) => (
                <div key={idx} className="popup-form-field">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  {field === "quantity" && (selectedCategory === "GROCERIES" || selectedCategory === "MEDICINE") ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="text"
                        style={{ flexGrow: 1, marginRight: '8px' }}
                        value={formData[field]?.split(' ')[0] || ""}
                        onChange={(e) => handleChange(e, field)}
                        placeholder={`Enter quantity`}
                      />
                      <select
                        value={formData[field]?.split(' ')[1] || ""}
                        onChange={handleQuantityTypeChange}
                      >
                        <option value="">Select Unit</option>
                        {quantityTypeOptions.map((type, i) => (
                          <option key={i} value={type}>{type}</option>
                        ))}
                      </select>
                      {formErrors[field] && <span className="error" style={{ color: 'red' }}>{formErrors[field]}</span>}
                    </div>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={formData[field] || ""}
                        onChange={(e) => handleChange(e, field)}
                        placeholder={`Enter ${field}`}
                      />
                      {formErrors[field] && <span className="error" style={{ color: 'red' }}>{formErrors[field]}</span>}
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="popup-actions">
              <button onClick={handleSave} className="save-btn">Save</button>
              <button onClick={togglePopup} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ShoppingList;
