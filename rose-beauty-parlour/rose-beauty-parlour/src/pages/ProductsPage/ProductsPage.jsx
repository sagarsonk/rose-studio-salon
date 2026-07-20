import React from 'react';
import './ProductsPage.css';

const salonProducts = [
  {
    id: 1,
    name: "Rose Elixir Glow Serum",
    category: "Skin Radiance",
    price: "₹1,499",
    description: "Infused with pure rose extracts and Vitamin C for instant natural luminosity.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Intense Keratin Therapy Mask",
    category: "Hair Care",
    price: "₹1,899",
    description: "Deep conditioning salon treatment formula to eliminate frizz and repair damaged hair.",
    image: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=500&q=80",
    badge: "New Launch"
  },
  {
    id: 3,
    name: "Argan Nourishing Hair Oil",
    category: "Hair Care",
    price: "₹1,250",
    description: "Lightweight organic Moroccan oil to restore smooth texture, shine, and structural strength.",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=500&q=80",
    badge: "Premium"
  },
  {
    id: 4,
    name: "Vitamin C Radiance Cream",
    category: "Skin Radiance",
    price: "₹2,100",
    description: "Hydrating overnight repair matrix designed to restore youthfulness and skin clarity.",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=500&q=80",
    badge: ""
  }
];

const ProductsPage = () => {
  // WhatsApp ordering redirection automation handler
  const handleBuyNow = (productName) => {
    const phoneNumber = "919999999999"; // ⚠️ Yahan salon ka asli WhatsApp number daal dena country code ke sath
    const message = encodeURIComponent(`Hello Rose Beauty Salon! I am interested in purchasing the product: *${productName}*. Please share the payment and availability details.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="universal-store-page">
      <div className="store-page-container">
        
        {/* Boutique Section Heading */}
        <div className="store-header">
          <span className="store-tag">Retail Boutique</span>
          <h1 className="store-title">Exclusive Salon Essentials</h1>
          <div className="store-accent-line"></div>
          <p className="store-subtitle">
            Bring the professional premium luxury transformation home with our handpicked hair and skincare essentials.
          </p>
        </div>

        {/* Dynamic Boutique E-commerce Product Grid */}
        <div className="store-grid-wrapper">
          {salonProducts.map((product) => (
            <div key={product.id} className="boutique-product-card">
              
              {/* Product Visual Area with Badges */}
              <div className="boutique-img-frame">
                {product.badge && <span className="boutique-card-badge">{product.badge}</span>}
                <img src={product.image} alt={product.name} className="boutique-img" />
              </div>

              {/* Product Descriptions Block */}
              <div className="boutique-info-block">
                <span className="boutique-prod-category">{product.category}</span>
                <h3 className="boutique-prod-name">{product.name}</h3>
                <p className="boutique-prod-desc">{product.description}</p>
                
                {/* Footer Meta Details & CTA Action Button */}
                <div className="boutique-card-footer">
                  <span className="boutique-prod-price">{product.price}</span>
                  <button 
                    onClick={() => handleBuyNow(product.name)} 
                    className="btn-boutique-buy"
                  >
                    Buy via WhatsApp
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;