import React, { useState, useContext } from 'react';
import { Camera, MapPin } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './PostAd.css';

const PostAd = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', category: 'Community', location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const categories = ['Community', 'Housing', 'Jobs', 'For Sale', 'Services', 'Vehicles'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
        setMessage('Error: You must be logged in to post an ad.');
        return;
    }
    setIsSubmitting(true);
    setMessage(null);

    try {
        const payload = {
            title: formData.title,
            description: formData.description,
            price: Number(formData.price),
            category: formData.category,
            location: { city: formData.location }
        };

        const res = await fetch('http://localhost:5000/api/listings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to post ad');

        setMessage('Success: Your Ad was posted successfully!');
        setFormData({ title: '', description: '', price: '', category: 'Community', location: '' });
    } catch (err) {
        setMessage(`Error: ${err.message}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="post-ad-container animate-in">
      <div className="post-header">
        <h1>Create a Listing</h1>
        <p>Post your item, property, or service to the community.</p>
      </div>

      <div className="post-body">
        <form className="post-form glass-panel" onSubmit={handleSubmit}>
          {message && <div className={message.startsWith('Success') ? 'success-msg' : 'error-message'}>{message}</div>}
          
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="What are you posting?" />
          </div>

          <div className="form-row">
            <div className="form-group half-width">
                <label>Price ($)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="0.00" />
            </div>
            <div className="form-group half-width">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
          </div>

          <div className="form-group">
            <label>Location (City)</label>
            <div className="input-with-icon">
                <MapPin size={18} className="input-icon" />
                <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Jaipur" />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Describe your listing in detail..." rows="5"></textarea>
          </div>

          <div className="form-group">
            <label>Images (Mocked)</label>
            <div className="image-upload-area">
                <Camera size={32} />
                <p>Click to upload photos (Simulated API Hook)</p>
            </div>
          </div>

          <button type="submit" className="btn-primary submit-btn" disabled={isSubmitting}>
             {isSubmitting ? 'Posting...' : 'Post Ad →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;
