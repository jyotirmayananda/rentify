import React, { useState } from 'react';
import axios from 'axios';

function AddProperty() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    amenities: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/properties', formData);
      console.log('Property added successfully:', response.data);
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
      <input type="text" name="place" placeholder="Place" onChange={handleChange} required />
      <input type="number" name="area" placeholder="Area (sq ft)" onChange={handleChange} required />
      <input type="number" name="bedrooms" placeholder="Bedrooms" onChange={handleChange} required />
      <input type="number" name="bathrooms" placeholder="Bathrooms" onChange={handleChange} required />
      <input type="text" name="amenities" placeholder="Nearby amenities" onChange={handleChange} required />
      <button type="submit">Add Property</button>
    </form>
  );
}

export default AddProperty;
