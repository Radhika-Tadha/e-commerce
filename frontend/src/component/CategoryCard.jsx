import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import { Link } from 'react-router-dom';
import axios from "axios"; // or import custom axios instance

export default function Categorycard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/AllProduct?category=${encodeURIComponent(category)}`);
    };

    useEffect(() => {
        const fetchLimitedProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/product/allProduct", {
                    withCredentials: true,
                });
                setProducts(res.data.product.slice(0, 3));
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLimitedProducts();
    }, []);

    return (
        <>
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-md-6 text-start">
                        <h2>Trending This Week</h2>
                    </div>
                    <div className="col-md-6 text-end">
                        <ul className="list-inline mb-2 fs-5 link-underline-opacity-0 m-2">
                            {["men", "women", "kids"].map((category) => (
                                <li key={category} className="list-inline-item nav-item nav-hover p-1">
                                    <Link
                                        className="nav-link d-inline text-decoration-underline text-primary"
                                        to={`/allproduct?category=${category}`}
                                    >
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <hr/>
            </div>

            {/* Product section */}
            {loading ? (
                <p className="text-center mt-4">Loading products...</p>
            ) : (
                <div className="container">
                <div className="row d-flex justify-content-center gap-4 w-100 px-3">
                    {products.map((product) => (
                        <div className="col-md-4 col-lg-3 m-4" key={product._id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                </div>
            )}
        </>
    );
}
