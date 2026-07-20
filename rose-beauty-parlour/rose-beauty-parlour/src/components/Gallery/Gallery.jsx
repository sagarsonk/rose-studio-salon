import "./Gallery.css";

import g1 from "../../assets/images/gallery/gallery1.jpg";
import g2 from "../../assets/images/gallery/gallery2.jpg";
import g3 from "../../assets/images/gallery/gallery3.jpg";
import g4 from "../../assets/images/gallery/gallery4.jpg";
import g5 from "../../assets/images/gallery/gallery5.jpg";
import g6 from "../../assets/images/gallery/gallery6.jpg";

function Gallery() {
  const images = [g1, g2, g3, g4, g5, g6];

  return (
    <section className="gallery-section">
      <div className="gallery-heading">
        <span>OUR GALLERY</span>
        <h2>Beauty Moments</h2>
        <p>
          Explore some of our beautiful transformations and salon services.
        </p>
      </div>

      <div className="gallery-grid">
        {images.map((image, index) => (
          <div className="gallery-card" key={index}>
            <img src={image} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;