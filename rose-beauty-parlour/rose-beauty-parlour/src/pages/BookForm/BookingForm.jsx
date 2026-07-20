import React, { useState } from 'react';
import axios from 'axios'; // 🎯 Network Bridge API call ke liye
import './BookingForm.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const API_BASE = "http://localhost:5000/api";

const BookingForm = () => {
  // 🎯 Form variables ko backend schema (name, number) ke sath exact match kar diya
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    service: '',
    date: '',
    time: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Server error error tracking ke liye

  const servicesList = [
    "Couture Hair Design & Spa",
    "Advanced Skin Radiance Facial",
    "Signature Bridal Artistry",
    "Luxury Manicure & Nail Couture",
    "Full Premium Pamper Package"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 📡 MAIN APPOINTMENT SUBMIT TRIGGER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    try {
      // 🚀 Yahan se direct payload data backend pipeline (server.js) me submit hoga
      const response = await axios.post(`${API_BASE}/appointments`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201 || response.status === 200) {
        setSubmitted(true); // Success Popup trigger karein
      }
    } catch (err) {
      console.error("Booking submission breakdown:", err);
      setErrorMessage("❌ Server communication drop. Appointment database offline.");
    }
  };

  const closeSuccessPopup = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', number: '', service: '', date: '', time: '' });
  };

  return (
    <section id="booking" className="universal-booking-section">
      <div className="universal-booking-container">
        
        {/* Header Block */}
        <div className="booking-header">
          <span className="booking-sub-title">Reservations</span>
          <h2 className="booking-main-title">Book An Appointment</h2>
          <div className="booking-accent-line"></div>
          <p className="booking-desc">
            Secure your luxury pampering session. Fill in the details below, and our team will prepare for your elite experience.
          </p>
        </div>

        {/* Master Form Card */}
        <div className="booking-card shadow-premium">
          {errorMessage && (
            <div style={{ color: '#e74c3c', padding: '12px', background: '#fdedec', borderRadius: '8px', marginBottom: '15px', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="booking-raw-form">
            <div className="booking-form-grid">
              
              {/* Full Name Input */}
              <div className="booking-input-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Email Address Input */}
              <div className="booking-input-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="name@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Phone Number Input */}
              <div className="booking-input-group">
                <label htmlFor="number">Phone Number</label>
                <input 
                  type="tel" 
                  id="number" 
                  name="number" 
                  required 
                  placeholder="Your mobile number" 
                  value={formData.number}
                  onChange={handleChange}
                />
              </div>

              {/* Service Dropdown Selection */}
              <div className="booking-input-group">
                <label htmlFor="service">Select Service</label>
                <select 
                  id="service" 
                  name="service" 
                  required 
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="" disabled>Choose a treatment</option>
                  {servicesList.map((srv, idx) => (
                    <option key={idx} value={srv}>{srv}</option>
                  ))}
                </select>
              </div>

              {/* Date Picker Input */}
              <div className="booking-input-group">
                <label htmlFor="date">Preferred Date</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  required 
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              {/* Time Selection Dropdown */}
              <div className="booking-input-group">
                <label htmlFor="time">Preferred Time Slot</label>
                <select 
                  id="time" 
                  name="time" 
                  required 
                  value={formData.time}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select time slot</option>
                  <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                  <option value="12:00 PM - 03:00 PM">Afternoon (12:00 PM - 03:00 PM)</option>
                  <option value="03:00 PM - 06:00 PM">Late Afternoon (03:00 PM - 06:00 PM)</option>
                  <option value="06:00 PM - 08:00 PM">Evening (06:00 PM - 08:00 PM)</option>
                </select>
              </div>

            </div>

            {/* Submit Reservation Action Button */}
            <div className="booking-action-area">
              <button type="submit" className="btn-submit-booking">
                Confirm Reservation
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Modern Soft Success Popup Modal */}
      {submitted && (
        <div className="booking-success-modal-overlay">
          <div className="booking-success-card animate-pop">
            <div className="success-icon-check">✓</div>
            <h3>Reservation Requested!</h3>
            <p>Thank you, <strong>{formData.name}</strong>. We have blocked a provisional slot for you on <strong>{formData.date}</strong>. Our salon coordinator will call you shortly to confirm.</p>
            <button onClick={closeSuccessPopup} className="btn-close-success">Perfect</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookingForm;