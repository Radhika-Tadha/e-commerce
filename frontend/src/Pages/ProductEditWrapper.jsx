import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateProduct from "../Admin/Pages/AddProduct"; 

export default function ProductEditWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(location.state?.EditProduct || null);

  useEffect(() => {
    if (!product) {
      // Fetch product from backend using ID 
      axios
        .get(`http://localhost:8000/api/product/${id}`)
        .then((res) => setProduct(res.data.product))
        .catch((err) => {
          console.log("Failed to load product", err);
          navigate("/AllProducts"); // fallback route
        });
    }
  }, [id, product, navigate]);

  if (!product) return <p>Loading product details...</p>;

  return <CreateProduct EditProduct={product} />;
}




