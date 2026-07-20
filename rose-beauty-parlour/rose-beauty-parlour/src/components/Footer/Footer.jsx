import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-box">
          <h2>Rose Beauty Parlour</h2>

          <p>
            Experience premium beauty services with professional care,
            luxury products and personalized treatments.
          </p>
        </div>

        <div className="footer-box">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/gallery">Gallery</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-box">
          <h3>Contact</h3>

          <p><FaPhoneAlt /> +91 9876543210</p>

          <p><FaEnvelope /> rosebeauty@gmail.com</p>

          <p><FaMapMarkerAlt /> Nagpur, Maharashtra</p>
        </div>

        <div className="footer-box">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
       <a 
  href="https://www.instagram.com/Rose_beauty_salon_" 
  target="_blank" 
  rel="noopener noreferrer"
  className="social-icon-link"
>
  <FaInstagram />
</a>
            <a href="#"><FaWhatsapp /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Rose Beauty Parlour. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;