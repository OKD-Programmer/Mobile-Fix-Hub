// src/Pages/PhoneManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Management.css';

const PhoneManagement = () => {
  const [phones, setPhones] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // NEW: Search term state
  const [filteredPhones, setFilteredPhones] = useState([]); // NEW: Filtered list state

  const [formData, setFormData] = useState({
    name: '', brand: '', price: '', condition: 'New', img: null,
    storage: '', ram: '', screen: '', battery: ''
  });
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchPhones = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/phones');
      setPhones(response.data);
    } catch (error) {
      console.error('Error fetching phones:', error);
      alert('Failed to fetch phones');
    }
  };

  // NEW: useEffect to filter phones based on search term
  useEffect(() => {
    const result = phones.filter(phone =>
      phone.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPhones(result);
  }, [phones, searchTerm]);

  useEffect(() => {
    fetchPhones();
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
    setFormData({ name: '', brand: '', price: '', condition: 'New', img: null, storage: '', ram: '', screen: '', battery: '' });
    setImagePreview(null);
    setIsEditing(false);
    setSelectedPhone(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== "img" && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });
    if (formData.img) {
      data.append("img", formData.img);
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/phones/${selectedPhone.id}`, data);
        alert('Phone updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/phones', data);
        alert('Phone added successfully!');
      }
      resetForm();
      fetchPhones();
    } catch (error) {
      console.error('Error saving phone:', error);
      alert('Failed to save phone');
    }
  };

  const handleDeletePhone = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/phones/${id}`);
      alert('Phone deleted successfully!');
      fetchPhones();
    } catch (error) {
      console.error('Error deleting phone:', error);
      alert('Failed to delete phone');
    }
  };

  const handleEditClick = (phone) => {
    setSelectedPhone(phone);
    setIsEditing(true);
    setFormData({
      name: phone.name, brand: phone.brand, price: phone.price, condition: phone.condition,
      storage: phone.storage, ram: phone.ram, screen: phone.screen, battery: phone.battery, img: null
    });
    setImagePreview(`http://localhost:5000/uploads/${phone.img}`);
  };

  return (
    <div className="phone-management">
      <h1>Mobile Phone Management</h1>
      <div className="management-section">
        <h2>{isEditing ? 'Edit Phone' : 'Add New Phone'}</h2>
        <form onSubmit={handleSubmit}>
          {/* ... (form fields remain the same) ... */}
          <div className="form-row"><input type="text" name="name" placeholder="Phone Name" value={formData.name} onChange={handleInputChange} required /></div>
          <div className="form-row"><input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleInputChange} required /><input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required /></div>
          <div className="form-row"><select name="condition" value={formData.condition} onChange={handleInputChange}><option value="New">New</option><option value="Used">Used</option><option value="Refurbished">Refurbished</option></select><input type="text" name="storage" placeholder="Storage (e.g., 128GB)" value={formData.storage} onChange={handleInputChange} /></div>
          <div className="form-row"><input type="text" name="ram" placeholder="RAM (e.g., 8GB)" value={formData.ram} onChange={handleInputChange} /><input type="text" name="screen" placeholder="Screen Size (e.g., 6.1 inch)" value={formData.screen} onChange={handleInputChange} /></div>
          <div className="form-row"><input type="text" name="battery" placeholder="Battery (e.g., 4000mAh)" value={formData.battery} onChange={handleInputChange} /><div className="file-input"><label>Image:</label><input type="file" accept="image/*" onChange={handleImageChange} /></div></div>
          {imagePreview && <div className="image-preview"><img src={imagePreview} alt="Preview" /></div>}
          <div className="form-buttons"><button type="submit">{isEditing ? 'Update Phone' : 'Add Phone'}</button>{isEditing && <button type="button" onClick={resetForm}>Cancel</button>}</div>
        </form>
      </div>
      <div className="management-section">
        <h2>All Phones ({filteredPhones.length})</h2>
        {/* NEW: Search Bar */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search phones by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="item-grid">
          {/* CHANGED: Map over filteredPhones */}
          {filteredPhones.map(phone => (
            <div key={phone.id} className="item-card">
              {phone.img && <img src={`http://localhost:5000/uploads/${phone.img}`} alt={phone.name} />}
              <div className="item-details">
                <h3>{phone.name}</h3><p><strong>Brand:</strong> {phone.brand}</p><p><strong>Price:</strong> ${phone.price}</p><p><strong>Condition:</strong> {phone.condition}</p>
              </div>
              <div className="item-actions"><button onClick={() => handleEditClick(phone)} className="edit-btn">Edit</button><button onClick={() => handleDeletePhone(phone.id)} className="delete-btn">Delete</button></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneManagement;
