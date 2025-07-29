import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product._id}`); // adjust path as per your routing
        // navigate("/ProductDetail"); // adjust path as per your routing

    };

    return (
        <div className="card border-0" style={{ width: "17rem", height: "32rem", cursor: "pointer", borderRadius: "none" }} onClick={handleClick}>
            <img
                src={`http://localhost:8000/uploads/${product.image}`} // assuming backend serves image from /uploads
                className="card-img-top bi-r-square-fill"
                alt={product.name}
                style={{ height: "400px", objectFit: "cover" }}
            />
            <div className="card-body text-start">
                <p className="card-text disabled">{product.category}</p>
                <h5 className="card-title">{product.name}</h5>
                <p className="primary">
                    Only ₹{product.price} &nbsp;
                    <span style={{ textDecoration: "line-through", color: "lightgray", fontSize: "0.9rem" }}>
                        ₹{Number(product.price) + 250}
                    </span>
                    &nbsp;
                    <span style={{ color: "orange", fontSize: "0.9rem" }}>
                        ({Math.round((200 / (Number(product.price) + 250)) * 100)}% OFF)
                    </span>
                </p>
            </div>
        </div>
    );
}