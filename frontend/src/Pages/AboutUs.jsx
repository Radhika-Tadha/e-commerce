import React from "react";
import aboutimg from "../Assets/about.jpg";

export default function AboutUs() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Image Section */}
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={aboutimg}
            alt="About us"
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Text Section */}
        <div className="col-md-6">
          <h2 className="mb-4">About Us</h2>
          <div className="row text-start">
          <p className="text-muted">
            Welcome to our store! We are a passionate team dedicated to delivering high-quality products and exceptional service.
            Our mission is to make your shopping experience seamless and enjoyable.
          </p>
          <p className="text-muted">
            Whether you're looking for trendy fashion, unique gifts, or everyday essentials — we've got you covered.
            Thank you for being a part of our journey!
          </p>

          <ul className="list-unstyled text-center">
            <li> Fast Delivery</li>
            <li> Secure Payments</li>
            <li> 24/7 Customer Support</li>
            <li> Easy Returns</li>
          </ul>

          <p className="text-muted mt-3">
            <em>- The DreamShop Team</em>
          </p>
            </div>
        </div>
      </div>
    </div>
  );
}
