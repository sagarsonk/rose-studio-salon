import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarCheck, FaTrashAlt, FaCheckCircle } from 'react-icons/fa';

const API_BASE = "https://rose-salon-backend.onrender.com/api";

const ManageBookings = ({ onRefreshCount }) => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');

  const loadBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/appointments?t=${new Date().getTime()}`);
      setBookings(res.data);
      if (onRefreshCount) onRefreshCount();
    } catch (err) { console.error("Error loading bookings:", err); }
  };

  useEffect(() => { loadBookings(); }, []);

  const showStatus = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(''), 4000);
  };

  const handleConfirm = async (id) => {
    try {
      await axios.put(`${API_BASE}/appointments/${id}`, { status: 'Confirmed' });
      showStatus('Appointment Status updated to Confirmed!');
      loadBookings();
    } catch (err) { showStatus('Status update failed.', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Wipe this booking out from database?')) return;
    try {
      await axios.delete(`${API_BASE}/appointments/${id}`);
      showStatus('Booking deleted successfully.');
      loadBookings();
    } catch (err) { showStatus('Delete failed.', 'error'); }
  };

  return (
    <div className="workspace-tab-view animate-slide-up" style={{ padding: '10px' }}>
      {message && <div className={`notification-badge ${message.type === 'error' ? 'error-bg' : 'success-bg'}`}>{message.text}</div>}
      
      <div className="workspace-data-table-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
          <FaCalendarCheck style={{ color: '#d63384', fontSize: '24px' }} />
          <h3>Live Client Appointment Logs ({bookings.length})</h3>
        </div>
        <p style={{ color: '#777', fontSize: '13px', marginBottom: '25px' }}>
          Realtime database pipeline is tracking user checkout queues from the customer booking form.
        </p>

        {bookings.length === 0 ? (
          <p style={{ color: '#888', fontSize: '14px', textAlign: 'center', padding: '30px' }}>No appointments booked yet.</p>
        ) : (
          <div className="table-responsive-wrapper" style={{ overflowX: 'auto' }}>
            <table className="custom-admin-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Contact Info</th>
                  <th>Treatment / Service</th>
                  <th>Schedule Info</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id}>
                    <td><strong style={{ color: '#1a1a1a' }}>{b.name}</strong></td>
                    <td>
                      <span style={{ display: 'block', fontSize: '13px', color: '#333' }}>📞 {b.number}</span>
                      {b.email && <span style={{ fontSize: '11px', color: '#777' }}>✉ {b.email}</span>}
                    </td>
                    <td>
                      <span className="status-badge-confirmed" style={{ background: '#fff0f5', color: '#d63384' }}>
                        {b.service}
                      </span>
                    </td>
                    <td>
                      <strong style={{ display: 'block', fontSize: '13px', color: '#1a1a1a' }}>📅 {b.date}</strong>
                      <span style={{ fontSize: '12px', color: '#666' }}>⏰ {b.time}</span>
                    </td>
                    <td>
                      {b.status === 'Pending' ? (
                        <span className="status-badge-pending">{b.status}</span>
                      ) : (
                        <span className="status-badge-confirmed">{b.status}</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        {b.status === 'Pending' && (
                          <button onClick={() => handleConfirm(b._id)} style={{ padding: '6px 12px', fontSize: '12px', border: 'none', background: '#d1fae5', color: '#059669', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <FaCheckCircle /> Confirm
                          </button>
                        )}
                        <button onClick={() => handleDelete(b._id)} className="btn-sidebar-logout" style={{ padding: '6px 12px', fontSize: '12px', width: 'auto', display: 'inline-flex', margin: 0 }}>
                          <FaTrashAlt /> Remove
                        </button>
                      </div>
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

export default ManageBookings;