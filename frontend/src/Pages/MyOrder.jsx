import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/order/my-orders", {
          withCredentials: true,
        });
        console.log("Orders:", res.data);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };
    fetchOrders();
  }, []);



  return (
    <div className="container my-3">
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order, i) => (
          <div key={i} className="card mb-3 shadow-sm">
            <div className="row g-0 align-items-center">
              <div className="col-sm-4">
                <img
                  src={`http://localhost:8000/uploads/${order.productId.image}`}
                  alt={order.productId.name}
                  className="img-fluid rounded-start"
                  style={{ width: "60%", height: "auto", objectFit: "cover" }}
                />
              </div>
              <div className="col-sm-8">
                <div className="card-body">
                  <h5 className="card-text">Name: {order.productId.name}</h5>
                  <h5 className="card-text ">Price: ₹{order.price}</h5>
                  <h5 className="card-text mb-2">Quantity: {order.quantity}</h5>
                  <h5 className="card-text mb-2">Address: {order.address}</h5>
                  <h5 className="card-text mb-2">Total:: {order.price * order.quantity}</h5>
                  <h6 className="card-text">
                    <small className="text-muted">
                      Ordered At: {new Date(order.createdAt).toLocaleString()}
                      <h6>
                        <span
                          className={`badge ${order.status === "Accepted"
                              ? "bg-success"
                              : order.status === "Rejected"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </h6>
                    </small>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
