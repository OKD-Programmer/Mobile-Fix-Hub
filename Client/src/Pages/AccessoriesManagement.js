// src/Pages/AccessoriesManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Management.css';

const AccessoriesManagement = () => {
  const [accessories, setAccessories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // NEW
  const [filteredAccessories, setFilteredAccessories] = useState([]); // NEW

  const [formData, setFormData] = useState({ name: '', brand: '', price: '', category: '', img: null });
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchAccessories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/accessories');
      setAccessories(response.data);
    } catch (error) {
      console.error('Error fetching accessories:', error);
      alert('Failed to fetch accessories');
    }
  };

  // NEW: useEffect to filter accessories
  useEffect(() => {
    const result = accessories.filter(accessory =>
      accessory.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAccessories(result);
  }, [accessories, searchTerm]);

  useEffect(() => {
    fetchAccessories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, img: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', brand: '', price: '', category: '', img: null });
    setImagePreview(null);
    setIsEditing(false);
    setSelectedAccessory(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => { if (key !== "img" && formData[key]) data.append(key, formData[key]); });
    if (formData.img) data.append("img", formData.img);
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/accessories/${selectedAccessory.id}`, data);
        alert('Accessory updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/accessories', data);
        alert('Accessory added successfully!');
      }
      resetForm(); fetchAccessories();
    } catch (error) { console.error('Error saving accessory:', error); alert('Failed to save accessory'); }
  };

  const handleDeleteAccessory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this accessory?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/accessories/${id}`);
      alert('Accessory deleted successfully!');
      fetchAccessories();
    } catch (error) {
      console.error('Error deleting accessory:', error);
      alert('Failed to delete accessory');
    }
  };

  const handleEditClick = (accessory) => {
    setSelectedAccessory(accessory);
    setIsEditing(true);
    setFormData({ name: accessory.name, brand: accessory.brand, price: accessory.price, category: accessory.category, img: null });
    setImagePreview(`http://localhost:5000/uploads/${accessory.img}`);
  };

  return (
    <div className="accessories-management">
      <h1>Accessories Management</h1>
      <div className="management-section">
        <h2>{isEditing ? 'Edit Accessory' : 'Add New Accessory'}</h2>
        <form onSubmit={handleSubmit}>
          {/* ... (form fields remain the same) ... */}
          <div className="form-row"><input type="text" name="name" placeholder="Accessory Name" value={formData.name} onChange={handleInputChange} required /></div>
          <div className="form-row"><input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleInputChange} required /><input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required /></div>
          <div className="form-row"><input type="text" name="category" placeholder="Category (e.g., Cases, Chargers)" value={formData.category} onChange={handleInputChange} required /><div className="file-input"><label>Image:</label><input type="file" accept="image/*" onChange={handleImageChange} /></div></div>
          {imagePreview && <div className="image-preview"><img src={imagePreview} alt="Preview" /></div>}
          <div className="form-buttons"><button type="submit">{isEditing ? 'Update Accessory' : 'Add Accessory'}</button>{isEditing && <button type="button" onClick={resetForm}>Cancel</button>}</div>
        </form>
      </div>
      <div className="management-section">
        <h2>All Accessories ({filteredAccessories.length})</h2>
        {/* NEW: Search Bar */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search accessories by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="item-grid">
          {/* CHANGED: Map over filteredAccessories */}
          {filteredAccessories.map(accessory => (
            <div key={accessory.id} className="item-card">
              {accessory.img && <img src={`http://localhost:5000/uploads/${accessory.img}`} alt={accessory.name} />}
              <div className="item-details">
                <h3>{accessory.name}</h3>
                <p><strong>Brand:</strong> {accessory.brand}</p>
                <p><strong>Price:</strong> ${accessory.price}</p>
                <p><strong>Category:</strong> {accessory.category}</p>
              </div>
              <div className="item-actions"><button onClick={() => handleEditClick(accessory)} className="edit-btn">Edit</button><button onClick={() => handleDeleteAccessory(accessory.id)} className="delete-btn">Delete</button></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessoriesManagement;
