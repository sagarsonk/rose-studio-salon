import React, { useState } from 'react';

const ManageServices = ({ services, onAddService, onDeleteService }) => {
  const [form, setForm] = useState({ title: '', category: '', price: '', duration: '', description: '', image: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddService({ ...form, id: Date.now() }); // Unique dynamic ID allocate karke parent component ko bhejenge
    setForm({ title: '', category: '', price: '', duration: '', description: '', image: '' }); // Form clear setup
  };

  return (
    <div className="admin-sub-workspace-view animate-slide-up">
      <div className="workspace-form-card">
        <h3>Create New Salon Service</h3>
        <p className="form-helper-text">Add bespoke beauty treatments dynamically onto your live website.</p>
        
        <form onSubmit={handleSubmit} className="premium-admin-form">
          <div className="form-input-row">
            <input 
              type="text" 
              placeholder="Service Name (e.g., Couture Hair Spa)" 
              required 
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Category (e.g., Hair Care, Bridal Artistry)" 
              required 
              value={form.category} 
              onChange={e => setForm({...form, category: e.target.value})} 
            />
          </div>
          
          <div className="form-input-row">
            <input 
              type="text" 
              placeholder="Price (e.g., ₹1,499)" 
              required 
              value={form.price} 
              onChange={e => setForm({...form, price: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Duration (e.g., 60 Mins)" 
              required 
              value={form.duration} 
              onChange={e => setForm({...form, duration: e.target.value})} 
            />
          </div>

          <input 
            type="text" 
            placeholder="Image URL Link (Unsplash image link or hosted asset link)" 
            required 
            value={form.image} 
            onChange={e => setForm({...form, image: e.target.value})} 
          />

          <textarea 
            placeholder="Brief service description to excite premium salon clients..." 
            required 
            rows="3"
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})} 
          />

          <button type="submit" className="btn-form-submit">Publish Service Live</button>
        </form>
      </div>

      {/* Live Active Catalog Panel */}
      <div className="workspace-data-table-card" style={{ marginTop: '30px' }}>
        <h3>Currently Live Menu Catalog ({services.length})</h3>
        
        {services.length === 0 ? (
          <p style={{ color: '#888', fontSize: '14px', textAlign: 'center', padding: '20px' }}>No services published yet.</p>
        ) : (
          <div className="table-responsive-wrapper">
            <table className="custom-admin-table">
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Service Details</th>
                  <th>Category</th>
                  <th>Pricing</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map(s => (
                  <tr key={s.id}>
                    <td>
                      <img src={s.image} alt="" style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                    </td>
                    <td>
                      <strong style={{ color: '#1a1a1a', display: 'block' }}>{s.title}</strong>
                      <span style={{ fontSize: '11px', color: '#888' }}>{s.duration}</span>
                    </td>
                    <td><span className="status-badge-confirmed" style={{ background: '#fff0f5', color: '#d63384' }}>{s.category}</span></td>
                    <td><strong style={{ color: '#1a1a1a' }}>{s.price}</strong></td>
                    <td style={{ textAlign: 'right' }}>
                      <button onClick={() => onDeleteService(s.id)} className="btn-sidebar-logout" style={{ padding: '6px 12px', fontSize: '12px', display: 'inline-flex', width: 'auto' }}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageServices;