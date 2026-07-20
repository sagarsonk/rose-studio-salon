import React, { useState } from 'react';

const ManageProducts = ({ products, onAddProduct, onDeleteProduct }) => {
  const [form, setForm] = useState({ name: '', category: '', price: '', description: '', image: '', badge: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({ ...form, id: Date.now() });
    setForm({ name: '', category: '', price: '', description: '', image: '', badge: '' });
  };

  return (
    <div className="admin-sub-workspace-view animate-slide-up">
      <div className="workspace-form-card">
        <h3>Publish Product Boutique Retail Item</h3>
        <p className="form-helper-text">Add professional premium luxury items for direct customer purchases.</p>
        
        <form onSubmit={handleSubmit} className="premium-admin-form">
          <div className="form-input-row">
            <input 
              type="text" 
              placeholder="Product Name (e.g., Rose Elixir Glow Serum)" 
              required 
              value={form.name} 
              onChange={e => setForm({...form, name: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Category (e.g., Skin Therapy, Hair Care)" 
              required 
              value={form.category} 
              onChange={e => setForm({...form, category: e.target.value})} 
            />
          </div>
          
          <div className="form-input-row">
            <input 
              type="text" 
              placeholder="Price Tag (e.g., ₹1,499)" 
              required 
              value={form.price} 
              onChange={e => setForm({...form, price: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Marketing Badge (e.g., Best Seller, New Launch)" 
              value={form.badge} 
              onChange={e => setForm({...form, badge: e.target.value})} 
            />
          </div>

          <input 
            type="text" 
            placeholder="Product Cover Image URL Link" 
            required 
            value={form.image} 
            onChange={e => setForm({...form, image: e.target.value})} 
          />

          <textarea 
            placeholder="Write product core specs and ingredients info..." 
            required 
            rows="3"
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})} 
          />

          <button type="submit" className="btn-form-submit" style={{ backgroundColor: '#1a1a1a' }}>Publish Product Live</button>
        </form>
      </div>

      {/* Live Products Table */}
      <div className="workspace-data-table-card" style={{ marginTop: '30px' }}>
        <h3>Currently Live Boutique Products ({products.length})</h3>
        
        {products.length === 0 ? (
          <p style={{ color: '#888', fontSize: '14px', textAlign: 'center', padding: '20px' }}>No products published yet.</p>
        ) : (
          <div className="table-responsive-wrapper">
            <table className="custom-admin-table">
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Product Title</th>
                  <th>Retail Price</th>
                  <th>Status Badges</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>
                      <img src={p.image} alt="" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} />
                    </td>
                    <td>
                      <strong style={{ color: '#1a1a1a', display: 'block' }}>{p.name}</strong>
                      <span style={{ fontSize: '11px', color: '#777' }}>{p.category}</span>
                    </td>
                    <td><strong style={{ color: '#d63384' }}>{p.price}</strong></td>
                    <td>
                      {p.badge ? <span className="status-badge-pending" style={{ background: '#fef3c7', color: '#d97706' }}>{p.badge}</span> : <span style={{ color: '#aaa', fontSize: '12px' }}>Standard</span>}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button onClick={() => onDeleteProduct(p.id)} className="btn-sidebar-logout" style={{ padding: '6px 12px', fontSize: '12px', display: 'inline-flex', width: 'auto' }}>
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

export default ManageProducts;