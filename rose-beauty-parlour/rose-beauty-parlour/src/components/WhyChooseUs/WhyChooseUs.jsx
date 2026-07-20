import "./WhyChooseUs.css";
import {
  FaUserCheck,
  FaHome,
  FaLeaf,
  FaClock,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaUserCheck />,
      title: "Professional Beauticians",
      desc: "Experienced beauticians providing premium beauty services.",
    },
    {
      icon: <FaHome />,
      title: "Home Service",
      desc: "Enjoy salon-quality beauty services at your doorstep.",
    },
    {
      icon: <FaLeaf />,
      title: "Premium Products",
      desc: "We use only trusted and skin-friendly beauty products.",
    },
    {
      icon: <FaClock />,
      title: "Easy Appointment",
      desc: "Book your appointment quickly and conveniently.",
    },
  ];

  return (
    <section className="why-section">
      <div className="section-title">
        <h5>WHY CHOOSE US</h5>
        <h2>Experience Beauty Like Never Before</h2>
      </div>

      <div className="why-grid">
        {features.map((item, index) => (
          <div className="why-card" key={index}>
            <div className="why-icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;