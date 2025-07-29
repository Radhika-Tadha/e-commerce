import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/order/all", {
      withCredentials: true,
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-responsive-">
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Total Price (₹)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.userId?.name || "N/A"}</td>
                  <td>{order.userId?.email || "N/A"}</td>
                  <td>{order.productId?.title || "N/A"}</td>
                  <td>{order.quantity}</td>
                  <td>{order.address}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "Pending"
                          ? "bg-warning text-dark"
                          : order.status === "Shipped"
                          ? "bg-info"
                          : order.status === "Delivered"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
