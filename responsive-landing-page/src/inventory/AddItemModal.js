import React, { useState } from 'react';
import axios from 'axios';

const AddItemModal = ({ showModal, closeModal }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleSubmit = async () => {
    const newItem = {
      name,
      quantity,
      category,
      expirationDate,
    };
  
    try {
      const response = await axios.post('http://localhost:8080/api/inventory/create', newItem);
      console.log('Item added:', response.data);
      closeModal();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  return (
    <div className={`modal ${showModal ? 'show' : ''}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add Groceries</h2>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="date"
          placeholder="Expiration Date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        <button onClick={handleSubmit}>Add Item</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default AddItemModal;
