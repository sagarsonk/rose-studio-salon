import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFileUpload, FaTrashAlt, FaAddressCard } from 'react-icons/fa';

const API_BASE = "http://localhost:5000/api";
const axiosConfig = { headers: { 'Content-Type': 'application/json' }, maxContentLength: Infinity, maxBodyLength: Infinity, timeout: 0 };

const ManageAbout = () => {
  const [aboutData, setAboutData] = useState({ aboutImage1: '', aboutImage2: '' });
  const [message, setMessage] = useState('');

  // 📡 Real-time Database se dynamic configurations load karne ke liye
  const loadConfig = async () => {
    try {
      const resAbout = await axios.get(`${API_BASE}/about-config`);
      if (resAbout.data) {
        setAboutData(resAbout.data);
      }
    } catch (err) {
      console.error("Error reading Live About configs:", err);
    }
  };

  useEffect(() => { loadConfig(); }, []);

  const showStatus = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(''), 4000);
  };

  // --- 🎯 LOCAL FILE UPLOAD: ABOUT IMAGE 1 (TOP/LEFT MATRIX) ---
  const handleFileUpload1 = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    showStatus('Uploading About Image 1... please wait.', 'success');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        await axios.post(`${API_BASE}/about-config`, { aboutImage1: reader.result }, axiosConfig);
        showStatus('About Image 1 updated successfully!');
        loadConfig();
      } catch (err) { showStatus('Upload limits pipeline breakdown.', 'error'); }
    };
  };

  // --- 🎯 LOCAL FILE UPLOAD: ABOUT IMAGE 2 (BOTTOM/RIGHT MATRIX) ---
  const handleFileUpload2 = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    showStatus('Uploading About Image 2... please wait.', 'success');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        await axios.post(`${API_BASE}/about-config`, { aboutImage2: reader.result }, axiosConfig);
        showStatus('About Image 2 updated successfully!');
        loadConfig();
      } catch (err) { showStatus('Upload limits pipeline breakdown.', 'error'); }
    };
  };

  // --- 🗑️ CLEAR ACCUMULATOR: CLEAN DATABASE SLOT ---
  const handleClearSlot = async (slotNum) => {
    if (!window.confirm(`Clear Image ${slotNum} Canvas Content from database live?`)) return;
    try {
      const payload = slotNum === 1 ? { aboutImage1: '' } : { aboutImage2: '' };
      await axios.post(`${API_BASE}/about-config`, payload, axiosConfig);
      showStatus(`Image ${slotNum} cleared successfully.`);
      loadConfig();
    } catch (err) { showStatus('Delete query frame failed.', 'error'); }
  };

  return (
    <div className="workspace-tab-view animate-slide-up" style={{ padding: '20px' }}>
      {message && <div className={`notification-badge ${message.type === 'error' ? 'error-bg' : 'success-bg'}`}>{message.text}</div>}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', alignItems: 'start' }}>
        
        {/* LEFT COMPONENT DESK FOR FILE FLOWS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div className="workspace-form-card" style={{ padding: '25px', borderRadius: '20px', background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <FaAddressCard style={{ color: '#d63384', fontSize: '24px' }}/>
              <h2>Manage About Section</h2>
            </div>
            <p className="form-helper-text" style={{ fontSize: '13px', color: '#777', margin: '0 0 20px 0' }}>
              Upload local image files from your computer to dynamically control the two main images inside the website About panel.
            </p>

            {/* DUAL DESK INPUT: CONTROL SLOT 1 */}
            <div style={{ border: '1px solid #ebdada', borderRadius: '12px', padding: '18px', background: '#faf7f7', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#1a1a1a' }}>ABOUT DISPLAY IMAGE 1 (TOP/LEFT)</label>
                {aboutData.aboutImage1 ? (
                  <span style={{ fontSize: '11px', color: '#2ecc71', fontWeight: '600', background: '#e6f4ea', padding: '2px 8px', borderRadius: '4px' }}>✓ Active</span>
                ) : (
                  <span style={{ fontSize: '11px', color: '#aaa', fontWeight: '500' }}>Vacant</span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label className="custom-file-upload-btn" style={{ display: 'inline-flex', padding: '10px 16px', borderRadius: '8px', border: '1px solid #ebdada', background: '#fff', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>
                  <FaFileUpload style={{ color: '#d63384', marginRight: '8px' }}/> Choose Image File 1
                  <input type="file" accept="image/*" onChange={handleFileUpload1} style={{ display: 'none' }} />
                </label>
                {aboutData.aboutImage1 && <button onClick={() => handleClearSlot(1)} className="btn-sidebar-logout" style={{ padding: '10px 16px', fontSize: '13px', width: 'auto', display: 'inline-flex', margin: 0 }}><FaTrashAlt/> Delete</button>}
              </div>
            </div>

            {/* DUAL DESK INPUT: CONTROL SLOT 2 */}
            <div style={{ border: '1px solid #ebdada', borderRadius: '12px', padding: '18px', background: '#faf7f7' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#1a1a1a' }}>ABOUT DISPLAY IMAGE 2 (BOTTOM/RIGHT)</label>
                {aboutData.aboutImage2 ? (
                  <span style={{ fontSize: '11px', color: '#2ecc71', fontWeight: '600', background: '#e6f4ea', padding: '2px 8px', borderRadius: '4px' }}>✓ Active</span>
                ) : (
                  <span style={{ fontSize: '11px', color: '#aaa', fontWeight: '500' }}>Vacant</span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label className="custom-file-upload-btn" style={{ display: 'inline-flex', padding: '10px 16px', borderRadius: '8px', border: '1px solid #ebdada', background: '#fff', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>
                  <FaFileUpload style={{ color: '#d63384', marginRight: '8px' }}/> Choose Image File 2
                  <input type="file" accept="image/*" onChange={handleFileUpload2} style={{ display: 'none' }} />
                </label>
                {aboutData.aboutImage2 && <button onClick={() => handleClearSlot(2)} className="btn-sidebar-logout" style={{ padding: '10px 16px', fontSize: '13px', width: 'auto', display: 'inline-flex', margin: 0 }}><FaTrashAlt/> Delete</button>}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT WORKSPACE: DUAL SYSTEM LIVE MONITORS */}
        <div className="workspace-data-table-card" style={{ padding: '25px', borderRadius: '20px', background: '#fff' }}>
          <h3>Live Preview Monitor (About Screen View)</h3>
          
          {/* Preview Image Box 1 */}
          <div style={{ padding: '12px', background: '#faf7f7', borderRadius: '12px', border: '1px solid #ebdada', marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#d63384', textTransform: 'uppercase' }}>Active Preview Monitor 1</span>
            <div style={{ width: '100%', height: '140px', borderRadius: '10px', overflow: 'hidden', background: '#ebdada', marginTop: '8px' }}>
              {aboutData.aboutImage1 ? <img src={aboutData.aboutImage1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ color: '#999', textAlign: 'center', lineHeight: '140px', fontSize: '12px' }}>Slot Vacant</div>}
            </div>
          </div>

          {/* Preview Image Box 2 */}
          <div style={{ padding: '12px', background: '#faf7f7', borderRadius: '12px', border: '1px solid #ebdada' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#d63384', textTransform: 'uppercase' }}>Active Preview Monitor 2</span>
            <div style={{ width: '100%', height: '140px', borderRadius: '10px', overflow: 'hidden', background: '#ebdada', marginTop: '8px' }}>
              {aboutData.aboutImage2 ? <img src={aboutData.aboutImage2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ color: '#999', textAlign: 'center', lineHeight: '140px', fontSize: '12px' }}>Slot Vacant</div>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageAbout;