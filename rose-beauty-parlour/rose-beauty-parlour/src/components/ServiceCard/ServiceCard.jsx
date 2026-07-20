import "./ServiceCard.css";

function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <div className="service-image-wrapper">
        <img
          src={service.image}
          alt={service.title}
          className="service-image"
        />

        <span className="price-tag">{service.price}</span>
      </div>

      <div className="service-content"> 
        <h3>{service.title}</h3>

        <p>{service.description}</p>

        <div className="service-footer">
          <span>{service.duration}</span>

          <button>Book Now</button>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;