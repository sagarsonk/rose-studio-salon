import "./Services.css";
import services from "../../data/services";
import ServiceCard from "../../components/ServiceCard/ServiceCard";

function Services() {
  return (
    <>
     

      <section className="services-page">
        <div className="services-heading">
          <h4>Our Services</h4>
          <h2>Beauty Services We Offer</h2>
          <p>
            Choose from our premium beauty services designed to make you look
            and feel your best.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Services;