import "./CTA.css";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="cta">

      <div className="cta-content">

        <span>BOOK YOUR APPOINTMENT</span>

        <h2>
          Ready to Feel Beautiful?
        </h2>

        <p>
          Pamper yourself with premium beauty services from
          Rose Beauty Parlour.
          Book your appointment today.
        </p>

        <Link to="/page/bookform">
          <button>Book Appointment</button>
        </Link>

      </div>

    </section>
  );
}

export default CTA;