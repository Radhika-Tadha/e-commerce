import { useEffect, useState } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import axios from "axios";

// ✅ Correct useQuery function
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function AllProducts({ limit }) {
    const query = useQuery();
    const [products, setProducts] = useState([]);
    const CategoryTerm = query.get("category")?.toLowerCase();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const url = CategoryTerm
                    ? `http://localhost:8000/api/product/allProduct?category=${CategoryTerm}`
                    : `http://localhost:8000/api/product/allProduct`;
                const res = await axios.get(url, { withCredentials: true });
                
                setProducts(res.data.product); // make sure your backend returns { product: [...] }
            } catch (err) {
                console.error("Error fetching products:", err);
                alert("Something went wrong!");
            }
        };

        fetchProduct(); // ✅ CALL the function here
    }, [CategoryTerm]);

    if (!Array.isArray(products) || products.length === 0) {
        return (
            <h3 className="text-center mt-5">
                {CategoryTerm
                    ? "No product found for your category."

                    : "No product available. Please create one!"}
            </h3>
        );
    }
    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center gap-4 w-100 px-3">
                    {products
                        .slice(0, limit || products.length)
                        .map((product) => (
                            <div
                                className="col-md-4 col-lg-3 m-4 text-start"
                                key={product._id}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                </div>
            </div>

        </>
    )
}