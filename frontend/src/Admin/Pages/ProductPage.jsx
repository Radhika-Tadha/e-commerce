import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductPage() {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/product/allproduct?role=admin`);
        // console.log("Fetched products:", res.data);
        setProducts(res.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      try {
        const res = await axios.delete(`http://localhost:8000/api/product/${id}`, {
          withCredentials: true
        });
        alert(res.data.message);
        // Remove from local state

        setProducts(prev => prev.filter(p => p._id !== id));

        // refetch or remove from local state
      } catch (err) {
        alert("Delete failed: " + err.response?.data?.message);
      }
    }
  };


  const handleUpdate = async (product) => {
    navigate(`/update/${product._id}`, { state: { EditProduct: product } });

  };
  if (!products)
    return <p>Loading...</p>
  return (
    <div className="container mt-4">
      {/* <div className="addproduct">
        <button type="submit" to="/AddProduct">Add Product</button>
      </div> */}
      <h2 className="mb-4">Product Details</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Size</th>
            <th>Category</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={i}>
              <td>
                <img src={`http://localhost:8000/uploads/${product.image}`} alt={product.name} width="50" />
              </td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.size}</td>
              <td>{product.category}</td>
              <td>{product.p_detail}</td>
              <td>

                <button className="btn btn-warning m-2" onClick={() => navigate(`/update/${product._id}`, { state: { EditProduct: product } })}><i className="bi bi-pencil-square"></i></button>
                <button className="btn btn-danger" onClick={() => handleDelete(product._id)}><i className="bi bi-trash3"></i></button>

              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}
