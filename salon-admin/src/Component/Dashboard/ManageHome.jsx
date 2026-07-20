import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFileUpload, FaTrashAlt, FaVideo, FaImage } from 'react-icons/fa';

const API_BASE = "http://localhost:5000/api";
const axiosConfig = { headers: { 'Content-Type': 'application/json' } };

const ManageHome = ({ onRefreshBanners }) => {
  // 1. Slider Matrix States (4 distinct frames)
  const [slides, setSlides] = useState([
    { id: 'slide1', img: '' },
    { id: 'slide2', img: '' },
    { id: 'slide3', img: '' },
    { id: 'slide4', img: '' }
  ]);
  
  // 2. Bridal Showcase States
  const [videoData, setVideoData] = useState({ videoUrl: '' });
  
  // 3. Hero Wallpaper Canvas States
  const [heroData, setHeroData] = useState({ heroImage: '' });
  const [message, setMessage] = useState('');

  const loadConfig = async () => {
    try {
      // 1. Slider Carousel Nodes sync
      const resBanners = await axios.get(`${API_BASE}/banners`);
      if (resBanners.data) {
        const dbSlides = resBanners.data.slice(0, 4);
        setSlides(slides.map((s, index) => dbSlides[index] ? { ...s, _id: dbSlides[index]._id, img: dbSlides[index].img } : { ...s, _id: undefined, img: '' }));
      }

      // 2. Video Track Sync
      const resVideo = await axios.get(`${API_BASE}/bridal-video`);
      if (resVideo.data) { setVideoData(resVideo.data); }

      // 3. Hero Backdrop Wallpaper Sync
      const resHero = await axios.get(`${API_BASE}/hero-config`);
      if (resHero.data) { setHeroData(resHero.data); }
      
      // Global Sidebar Metric Synchronizer Trigger
      if (onRefreshBanners) onRefreshBanners();
    } catch (err) { console.error("Data tracking stream breakdown:", err); }
  };

  useEffect(() => { loadConfig(); }, []);

  const showStatus = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(''), 4000);
  };

  // --- 🎯 CARD SLIDER: ORIGINAL LOCAL FILE FILEREADER ENGINE ---
  const handleSliderFileUpload = (e, slideId, existingId) => {
    const file = e.target.files[0];
    if (!file) return;
    
    showStatus('Uploading slider image frame... please wait.', 'success');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        // Agar slot mein pehle se image hai, toh use pehle clean karenge taaki override issues na hon
        if (existingId) {
          await axios.delete(`${API_BASE}/banners/${existingId}`);
        }
        await axios.post(`${API_BASE}/banners`, { img: reader.result }, axiosConfig);
        showStatus('Slider image configured successfully!');
        loadConfig();
      } catch (err) { showStatus('Upload failed. Check console.', 'error'); }
    };
  };

  const handleClearSlide = async (dbId) => {
    if (!window.confirm('Wipe slider segment out from database live?')) return;
    try {
      await axios.delete(`${API_BASE}/banners/${dbId}`);
      showStatus('Slider slot cleared');
      loadConfig();
    } catch (err) { showStatus('Delete query frame failed.', 'error'); }
  };

  // --- 🎯 BRIDAL SHOWCASE VIDEO: LOCAL FILE EXPLORER ENGINE ---
  const handleVideoFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    showStatus('Streaming video buffer chunk onto server...', 'success');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        await axios.post(`${API_BASE}/bridal-video`, { videoUrl: reader.result }, axiosConfig);
        showStatus('Brand movie video package synchronized!');
        loadConfig();
      } catch (err) { showStatus('Video buffer chunk rejected by node.', 'error'); }
    };
  };

  // --- 🎯 HERO CANVAS BACKGROUND: LOCAL FILE EXPLORER ENGINE ---
  const handleHeroFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    showStatus('Configuring wallpaper canvas orientation...', 'success');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        await axios.post(`${API_BASE}/hero-config`, { heroImage: reader.result }, axiosConfig);
        showStatus('Hero backdrop live sync complete!');
        loadConfig();
      } catch (err) { showStatus('Hero matrix file rendering issue.', 'error'); }
    };
  };

  return (
    <div className="workspace-tab-view animate-slide-up" style={{ padding: '0 10px' }}>
      {message && <div className={`notification-badge ${message.type === 'error' ? 'error-bg' : 'success-bg'}`}>{message.text}</div>}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', alignItems: 'start' }}>
        
        {/* LEFT COMPONENT DESK FOR INPUT FLOWS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* CardSlider Master Upload Box */}
          <div className="workspace-form-card" style={{ padding: '25px', borderRadius: '20px' }}>
            <h3>CardSlider Control Desk</h3>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>Upload dynamic photos from your device directly into the carousel.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {slides.map((slide, index) => (
                <div key={slide.id} style={{ border: '1px solid #ebdada', borderRadius: '12px', padding: '18px', background: '#faf7f7' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#1a1a1a' }}>Slot Frame {index + 1}</label>
                    {slide.img ? (
                      <span style={{ fontSize: '11px', color: '#2ecc71', fontWeight: '600', background: '#e6f4ea', padding: '2px 8px', borderRadius: '4px' }}>✓ Asset Active</span>
                    ) : (
                      <span style={{ fontSize: '11px', color: '#aaa', fontWeight: '500' }}>Empty Slot</span>
                    )}
                  </div>

                  {/* Micro Inline Dynamic Display Asset */}
                  {slide.img && (
                    <div style={{ width: '80px', height: '50px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '10px', background: '#fff' }}>
                      <img src={slide.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  
                  {/* FILE UPLOAD ENGINE BUTTON ELEMENT */}
                  <label className="custom-file-upload-btn" style={{ display: 'inline-flex', padding: '10px 16px', borderRadius: '8px', border: '1px solid #ebdada', background: '#fff', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>
                    <FaFileUpload style={{ color: '#d63384', marginRight: '8px' }}/> 
                    {slide.img ? "Change Image File" : "Choose Image File"}
                    <input type="file" accept="image/*" onChange={(e) => handleSliderFileUpload(e, slide.id, slide._id)} style={{ display: 'none' }} />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Bridal Video Upload Box */}
          <div className="workspace-form-card" style={{ padding: '25px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FaVideo style={{ color: '#d63384' }}/><h3>Bridal Showcase Video Settings</h3></div>
            <div style={{ border: '1px solid #ebdada', borderRadius: '12px', padding: '18px', background: '#faf7f7', marginTop: '15px' }}>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>Pick a brand movie or promotion clip directly from your system.</p>
              <label className="custom-file-upload-btn" style={{ display: 'inline-flex', padding: '10px 16px', borderRadius: '8px', border: '1px solid #ebdada', background: '#fff', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>
                <FaFileUpload style={{ color: '#d63384', marginRight: '8px' }}/> Choose Video File
                <input type="file" accept="video/*" onChange={handleVideoFileUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {/* Hero Backdrop Upload Box */}
          <div className="workspace-form-card" style={{ padding: '25px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FaImage style={{ color: '#d63384' }}/><h3>Hero Section Banner Settings</h3></div>
            <div style={{ border: '1px solid #ebdada', borderRadius: '12px', padding: '18px', background: '#faf7f7', marginTop: '15px' }}>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>Modify the primary main banner wallpaper on the website background layout.</p>
              <label className="custom-file-upload-btn" style={{ display: 'inline-flex', padding: '10px 16px', borderRadius: '8px', border: '1px solid #ebdada', background: '#fff', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>
                <FaFileUpload style={{ color: '#d63384', marginRight: '8px' }}/> Choose Hero Wallpaper File
                <input type="file" accept="image/*" onChange={handleHeroFileUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE DATA DISPLAY SCREEN ACTIVE MONITOR PIPELINES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Slider Monitor Screen */}
          <div className="workspace-data-table-card" style={{ padding: '25px', borderRadius: '20px' }}>
            <h3>Live Slider Monitor</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
              {slides.map((slide, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: '#faf7f7', borderRadius: '12px', border: '1px solid #ebdada' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#ccc' }}>{idx+1}</span>
                  <div style={{ width: '70px', height: '45px', borderRadius: '6px', overflow: 'hidden' }}>
                    {slide.img ? <img src={slide.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ fontSize: '9px', lineHeight: '45px', color: '#999', textAlign: 'center' }}>EMPTY</div>}
                  </div>
                  {slide._id && <button onClick={() => handleClearSlide(slide._id)} style={{ border: 'none', background: '#fff0f5', color: '#e53e3e', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}><FaTrashAlt/></button>}
                </div>
              ))}
            </div>
          </div>

          {/* Video Monitor Screen */}
          <div className="workspace-data-table-card" style={{ padding: '25px', borderRadius: '20px' }}>
            <h3>Live Video Monitor</h3>
            <div style={{ padding: '12px', background: '#faf7f7', borderRadius: '15px', border: '1px solid #ebdada', marginTop: '15px' }}>
              <div style={{ width: '100%', height: '140px', borderRadius: '10px', overflow: 'hidden', background: '#000' }}>
                {videoData.videoUrl ? <video src={videoData.videoUrl} controls muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ color: '#666', textAlign: 'center', lineHeight: '140px', fontSize: '12px' }}>No Active Stream</div>}
              </div>
            </div>
          </div>

          {/* Hero Monitor Screen */}
          <div className="workspace-data-table-card" style={{ padding: '25px', borderRadius: '20px' }}>
            <h3>Live Hero Monitor</h3>
            <div style={{ padding: '12px', background: '#faf7f7', borderRadius: '15px', border: '1px solid #ebdada', marginTop: '15px' }}>
              <div style={{ width: '100%', height: '160px', borderRadius: '10px', overflow: 'hidden', background: '#ebdada' }}>
                {heroData.heroImage ? <img src={heroData.heroImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ color: '#999', textAlign: 'center', lineHeight: '160px', fontSize: '12px' }}>No Active Wall</div>}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ManageHome;