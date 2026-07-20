import "./Testimonials.css";

function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      service: "Bridal Makeup",
      review:
        "Amazing service! My bridal makeup looked beautiful and lasted the whole day.",
    },
    {
      id: 2,
      name: "Sneha Patel",
      service: "Hair Spa",
      review:
        "Very professional staff. My hair feels so smooth and healthy after the spa.",
    },
    {
      id: 3,
      name: "Anjali Verma",
      service: "Facial",
      review:
        "The facial was so relaxing and my skin was glowing instantly. Highly recommended!",
    },
  ];

  return (
    <section className="testimonial-section">
      <div className="testimonial-heading">
        <span>TESTIMONIALS</span>
        <h2>What Our Clients Say</h2>
      </div>

      <div className="testimonial-grid">
        {reviews.map((review) => (
          <div className="testimonial-card" key={review.id}>
            <div className="stars">★★★★★</div>

            <p>"{review.review}"</p>

            <h3>{review.name}</h3>

            <span>{review.service}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;