import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardShell.css';
import ManageServices from './ManageServices';
import ManageProducts from './ManageProducts';
import ManageAbout from './ManageAbout';
import ManageHome from './ManageHome'; 
import ManageBookings from './ManageBookings'; // 🎯 Import Naya Component
import { FaThLarge, FaCut, FaShoppingBag, FaCalendarCheck, FaSignOutAlt, FaHome, FaAddressCard } from 'react-icons/fa';

const API_BASE = "http://localhost:5000/api";

const DashboardShell = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]); 
  const [bookingCount, setBookingCount] = useState(0); // 🎯 Local booking state tracker

  const fetchData = async () => {
    try {
      const servRes = await axios.get(`${API_BASE}/services`);
      const prodRes = await axios.get(`${API_BASE}/products`);
      const bannerRes = await axios.get(`${API_BASE}/banners`);
      const bookingRes = await axios.get(`${API_BASE}/appointments`); // 🎯 Bookings pull kiya
      
      setServices(servRes.data);
      setProducts(prodRes.data);
      setBanners(bannerRes.data);
      setBookingCount(bookingRes.data.length); // Count sync
    } catch (err) { 
      console.error("API Fetch Error:", err); 
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const handleAddService = async (newServ) => {
    try { await axios.post(`${API_BASE}/services`, newServ); fetchData(); } catch (err) { console.error(err); }
  };
  const handleDeleteService = async (id) => {
    try { await axios.delete(`${API_BASE}/services/${id}`); fetchData(); } catch (err) { console.error(err); }
  };
  const handleAddProduct = async (newProd) => {
    try { await axios.post(`${API_BASE}/products`, newProd); fetchData(); } catch (err) { console.error(err); }
  };
  const handleDeleteProduct = async (id) => {
    try { await axios.delete(`${API_BASE}/products/${id}`); fetchData(); } catch (err) { console.error(err); }
  };

  return (
    <div className="admin-dashboard-layout">
      
      {/* SIDEBAR VIEW */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand-wrapper">
          <h3>Rose Studio Desk</h3>
          <span>Operational Control</span>
        </div>
        <nav className="sidebar-menu-links">
          <button className={`menu-btn-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <FaThLarge className="menu-icon" /> Overview Desk
          </button>
          
          {/* 🎯 Naya Live Booking Tab Sidebar me link ho gaya */}
          <button className={`menu-btn-item ${activeTab === 'booking-logs' ? 'active' : ''}`} onClick={() => setActiveTab('booking-logs')}>
            <FaCalendarCheck className="menu-icon" /> Booking Requests
          </button>

          <button className={`menu-btn-item ${activeTab === 'home-settings' ? 'active' : ''}`} onClick={() => setActiveTab('home-settings')}>
            <FaHome className="menu-icon" /> Home Settings
          </button>
          
          <button className={`menu-btn-item ${activeTab === 'about-settings' ? 'active' : ''}`} onClick={() => setActiveTab('about-settings')}>
            <FaAddressCard className="menu-icon" /> About Section
          </button>

          <button className={`menu-btn-item ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>
            <FaCut className="menu-icon" /> Edit Services
          </button>
          <button className={`menu-btn-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            <FaShoppingBag className="menu-icon" /> Edit Products
          </button>
        </nav>
        <div className="sidebar-footer-area">
          <button onClick={onLogout} className="btn-sidebar-logout"><FaSignOutAlt /> Exit Session</button>
        </div>
      </aside>

      {/* MAIN DATA WORKSPACE */}
      <main className="admin-main-workspace">
        <header className="workspace-top-bar">
          <h2>Welcome Back, Corporate Admin</h2>
          <div className="admin-profile-badge">Database Live</div>
        </header>

        {activeTab === 'overview' && (
          <div className="workspace-tab-view animate-slide-up">
            <div className="analytics-cards-grid">
              <div className="analytics-card-item">
                <div className="card-stat-header">
                  <h4>Total Bookings</h4>
                  <span className="stat-icon-wrap"><FaCalendarCheck /></span>
                </div>
                {/* 🎯 Ab overview desk dynamic counter show karega */}
                <div className="card-stat-value">{bookingCount}</div>
                <p className="card-stat-subtext">Pending client queues</p>
              </div>
              <div className="analytics-card-item">
                <div className="card-stat-header">
                  <h4>Live Banners</h4>
                  <div className="stat-icon-wrap"><FaHome /></div>
                </div>
                <div className="card-stat-value">{banners.length}</div>
                <p className="card-stat-subtext">Active Slider Images</p>
              </div>
              <div className="analytics-card-item">
                <div className="card-stat-header">
                  <h4>Live Services</h4>
                  <div className="stat-icon-wrap"><FaCut /></div>
                </div>
                <div className="card-stat-value">{services.length}</div>
                <p className="card-stat-subtext">Synced from MongoDB</p>
              </div>
            </div>
            
            <div className="workspace-data-table-card">
              <h3>System Overview Status</h3>
              <p style={{ color: '#999', fontSize: '13px' }}>Database listeners are actively polling booking nodes perfectly.</p>
            </div>
          </div>
        )}

        {/* 🎯 Routing to Bookings Panel */}
        {activeTab === 'booking-logs' && (
          <ManageBookings onRefreshCount={fetchData} />
        )}

        {activeTab === 'home-settings' && (
          <ManageHome onRefreshBanners={fetchData} />
        )}

        {activeTab === 'about-settings' && (
          <ManageAbout />
        )}

        {activeTab === 'services' && (
          <div className="workspace-tab-view animate-slide-up">
            <ManageServices services={services} onAddService={handleAddService} onDeleteService={handleDeleteService} />
          </div>
        )}

        {activeTab === 'products' && (
          <div className="workspace-tab-view animate-slide-up">
            <ManageProducts products={products} onAddProduct={handleAddProduct} onDeleteProduct={handleDeleteProduct} />
          </div>
        )}
      </main>

    </div>
  );
};

export default DashboardShell;