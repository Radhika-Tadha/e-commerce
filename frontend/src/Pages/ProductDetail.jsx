import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [redirectToCart, setRedirectToCart] = useState(false); // <-- step 1
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const increaseQty = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };
    // addToCart handler:
    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
    };
    useEffect(() => {
        axios.get("http://localhost:8000/api/user/getUser", {
            withCredentials: true
        })
            .then((res) => setUser(res.data.user))
            .catch((err) => console.log("User fetch failed", err));
    }, []);
    const handleBuyNow = () => {
        if (!user) {
            alert("Please log in first to buy the product.");
            navigate("/login");
            return;
        }

        const isConfirmed = window.confirm("Are you sure you want to order this product?");
        if (!isConfirmed) return;

        // Save necessary data to localStorage or Redux
        // const quantity = parseInt(localStorage.getItem("quantity"), 10) || 1;
        console.log("Buying product with quantity:", quantity);

        localStorage.setItem("checkout_product", JSON.stringify({
            productId: product._id,
            title: product.title,
            price: product.price,
            // address: order.address,
            quantity: quantity,
        }));
        console.log("Buying product with quantity:", quantity);

        console.log("Storing to localStorage:", {
            productId: product._id,
            title: product.title,
            price: product.price,
            quantity,
        });

        navigate(`/checkout/${product._id}`);
    };


    useEffect(() => {
        if (redirectToCart) {
            navigate('/cart'); // <-- step 3: navigate
        }
    }, [redirectToCart, navigate]);


    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then((res) => setProduct(res.data.product))
            .catch((err) => console.error("Error loading product:", err));
    }, [id]);

    if (!product) {
        return <p className="text-center mt-5">Loading...</p>;
    }

    return (
        <>
            <style>{`
                .custom-readmore {
                    border: 1px solid rgb(17, 63, 103);
                    color: rgb(17, 63, 103);
                    background-color: transparent;
                    border-radius: 0;
                    padding: 8px 20px;
                    transition: background-color 0.3s ease, color 0.3s ease;
                }
                .custom-readmore:hover {
                    background-color: rgb(17, 63, 103);
                    color: #ffff;
                }
                .img {
                    max-width: 100%;
                    height: auto;
                }
            `}</style>

            <div className="container mt-4 text-start">
                <div className="row">
                    <div className="col-sm-6 img-section">
                        <img
                            src={`http://localhost:8000/uploads/${product.image}`}
                            alt={product.name}
                            className="img-fluid "
                            style={{ maxHeight: "90%", objectFit: "cover", maxWidth: "100%" }}
                        />
                    </div>
                    <div className="col-sm-6">
                        <p className="text-muted">{product.category}</p>
                        <h2>{product.name}</h2>
                        <h5 className="primary">
                            Only ₹{product.price} &nbsp;
                            <span style={{ textDecoration: "line-through", color: "lightgray", fontSize: "0.9rem" }}>
                                ₹{Number(product.price) + 250}
                            </span>
                            &nbsp;
                            <span style={{ color: "orange", fontSize: "0.9rem" }}>Up to
                                ({Math.round((200 / (Number(product.price) + 250)) * 100)}% OFF)
                            </span>
                        </h5>
                        <h5>{product.p_detail || "No description available"}</h5>
                        <div className="d-flex align-items-center my-3"><br></br>
                            <button
                                className="btn btn-outline-secondary"
                                onClick={decreaseQty}
                                style={{ width: '40px', height: '40px' }}>
                                -</button>
                            <div
                                className="mx-3"
                                style={{ minWidth: '30px', textAlign: 'center', fontSize: '18px' }}>
                                {quantity}
                            </div>

                            <button
                                className="btn btn-outline-secondary"
                                onClick={increaseQty}
                                style={{ width: '40px', height: '40px' }}
                            >+</button>
                        </div>

                        <div className="row mt-3">
                            <button type="button" className="btn custom-readmore rounded-0 col-sm-3 mx-2" onClick={handleAddToCart}>ADD TO CART</button>
                            <button type="button" className="btn custom-readmore rounded-0 col-sm-3 mx-2" onClick={handleBuyNow}>BUY NOW</button>
                        </div>
                        <hr />
                        <p className="text-muted">Category: {product.category}</p>
                    </div>
                </div>

            </div>
        </>
    );
}
