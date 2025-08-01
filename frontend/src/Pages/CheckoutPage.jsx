import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export default function CheckoutPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState(null);
  // const [order, setOrder] = useState([]);
  const [quantity, setQuantity] = useState(null);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const steps = ["Address", "Confirm Order", "Payment"];

  const handlePlaceOrder = async () => {
    if (!address) return alert("Please enter your address.");
    try {
      console.log("Placing Order:", {
        userId: user._id,
        productId: product._id,
        quantity,
        price: product.price,
        address,
      });
      await axios.post("http://localhost:8000/api/order/place", {
        userId: user._id,
        productId: product._id,
        quantity: quantity,
        price: product.price,
        address: address,
      }, { withCredentials: true });

      localStorage.removeItem("buyNow");
      alert("Order placed successfully!");
      navigate("/MyOrders");
    } catch (err) {
      console.error("Order failed", err.response?.data || err.message);
      alert("Failed to place order.");
    }
  };
  useEffect(() => {
    const fetchUserAndProduct = async () => {
      try {
        const [userRes, productRes] = await Promise.all([
          axios.get("http://localhost:8000/api/user/getUser", { withCredentials: true }),
          axios.get(`http://localhost:8000/api/product/${id}`),
          axios.get("http://localhost:8000/api/order/my-orders", { withCredentials: true })
        ]);
        console.log("qut..",quantity);
        setUser(userRes.data.user);
        setProduct(productRes.data.product);

        // Load quantity from checkout_product
        const stored = JSON.parse(localStorage.getItem("checkout_product"));
        if (stored?.quantity) {
          setQuantity(stored.quantity);
        } else {
          setQuantity(1); // fallback if quantity is not found
        }

      } catch (err) {
        console.error("Failed to load data", err);
      }
    };

    fetchUserAndProduct();
  }, [id]);

  if (!user || !product) {
    return <p className="text-center mt-5">Loading...</p>;
  }
  return (
    <div className="container mt-5">
      {/* Step per UI */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {steps.map((label, index) => (
          <div key={index} className="text-center" style={{ flex: 1 }}>
            <div
              style={{
                height: 30,
                width: 30,
                borderRadius: "50%",
                backgroundColor: index <= step ? "#0d6efd" : "#ccc",
                margin: "0 auto",
                lineHeight: "30px",
                color: "white",
              }}
            >
              {index + 1}
            </div>
            <small>{label}</small>
            {index < steps.length - 1 && (
              <div
                style={{
                  height: 2,
                  backgroundColor: index < step ? "#0d6efd" : "#ccc",
                  margin: "8px auto",
                  width: "80%",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Contents */}
      {step === 0 && (
        <div>
          <h4>Shipping Address</h4>
          <textarea
            className="form-control"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button className="btn btn-primary mt-3" onClick={handleNext} disabled={!address}>
            Continue
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <h4>Confirm Order</h4>

          <ul className="list-group">
            <li className="list-group-item">Product: {product.category}</li>
            <li className="list-group-item">Product: {product.name}</li>
            <li className="list-group-item">Price: ₹{product.price}</li>
            <li className="list-group-item">Quantity: {quantity}</li>
            <li className="list-group-item">Address: {address}</li>
            <li className="list-group-item">
              Total: ₹{product.price * quantity}
            </li>

          </ul>
          <div className="mt-3">
            <button className="btn btn-secondary me-2" onClick={handleBack}>
              Back
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              Proceed to Payment
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h4>Select Payment Method</h4>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="payment"
              id="cod"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="cod">
              Cash on Delivery
            </label>
          </div>
          <button className="btn btn-secondary me-2" onClick={handleBack}>
            Back
          </button>
          <button className="btn btn-success" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

