// src/Pages/PartsManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Management.css';

const PartsManagement = () => {
  const [parts, setParts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // NEW
  const [filteredParts, setFilteredParts] = useState([]); // NEW

  const [formData, setFormData] = useState({ name: '', brand: '', price: '', compatible: '', img: null });
  const [selectedPart, setSelectedPart] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchParts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/parts');
      setParts(response.data);
    } catch (error) {
      console.error('Error fetching parts:', error);
      alert('Failed to fetch parts');
    }
  };

  // NEW: useEffect to filter parts
  useEffect(() => {
    const result = parts.filter(part =>
      part.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredParts(result);
  }, [parts, searchTerm]);

  useEffect(() => {
    fetchParts();
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
    setFormData({ name: '', brand: '', price: '', compatible: '', img: null });
    setImagePreview(null);
    setIsEditing(false);
    setSelectedPart(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => { if (key !== "img" && formData[key]) data.append(key, formData[key]); });
    if (formData.img) data.append("img", formData.img);
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/parts/${selectedPart.id}`, data);
        alert('Part updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/parts', data);
        alert('Part added successfully!');
      }
      resetForm(); fetchParts();
    } catch (error) { console.error('Error saving part:', error); alert('Failed to save part'); }
  };

  const handleDeletePart = async (id) => {
    if (!window.confirm('Are you sure you want to delete this part?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/parts/${id}`);
      alert('Part deleted successfully!');
      fetchParts();
    } catch (error) {
      console.error('Error deleting part:', error);
      alert('Failed to delete part');
    }
  };

  const handleEditClick = (part) => {
    setSelectedPart(part);
    setIsEditing(true);
    setFormData({ name: part.name, brand: part.brand, price: part.price, compatible: part.compatible, img: null });
    setImagePreview(`http://localhost:5000/uploads/${part.img}`);
  };

  return (
    <div className="parts-management">
      <h1>Replacement Parts Management</h1>
      <div className="management-section">
        <h2>{isEditing ? 'Edit Part' : 'Add New Part'}</h2>
        <form onSubmit={handleSubmit}>
          {/* ... (form fields remain the same) ... */}
          <div className="form-row"><input type="text" name="name" placeholder="Part Name" value={formData.name} onChange={handleInputChange} required /></div>
          <div className="form-row"><input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleInputChange} required /><input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required /></div>
          <div className="form-row"><input type="text" name="compatible" placeholder="Compatible Devices (e.g., iPhone 12, Samsung S21)" value={formData.compatible} onChange={handleInputChange} required /><div className="file-input"><label>Image:</label><input type="file" accept="image/*" onChange={handleImageChange} /></div></div>
          {imagePreview && <div className="image-preview"><img src={imagePreview} alt="Preview" /></div>}
          <div className="form-buttons"><button type="submit">{isEditing ? 'Update Part' : 'Add Part'}</button>{isEditing && <button type="button" onClick={resetForm}>Cancel</button>}</div>
        </form>
      </div>
      <div className="management-section">
        <h2>All Parts ({filteredParts.length})</h2>
        {/* NEW: Search Bar */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search parts by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="item-grid">
          {/* CHANGED: Map over filteredParts */}
          {filteredParts.map(part => (
            <div key={part.id} className="item-card">
              {part.img && <img src={`http://localhost:5000/uploads/${part.img}`} alt={part.name} />}
              <div className="item-details">
                <h3>{part.name}</h3>
                <p><strong>Brand:</strong> {part.brand}</p>
                <p><strong>Price:</strong> ${part.price}</p>
                <p><strong>Compatible:</strong> {part.compatible}</p>
              </div>
              <div className="item-actions"><button onClick={() => handleEditClick(part)} className="edit-btn">Edit</button><button onClick={() => handleDeletePart(part.id)} className="delete-btn">Delete</button></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartsManagement;
