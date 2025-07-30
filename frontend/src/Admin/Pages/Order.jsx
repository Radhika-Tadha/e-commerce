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

  const updateOrderStatus = async (orderId, status) => {
  try {
    await axios.put(`http://localhost:8000/api/order/${orderId}`, { status }, {
      withCredentials: true,
    });
    alert(`Order ${status === "Delivered" ? "Approved" : "Rejected"}!`);
    // Refresh orders or update UI accordingly
  } catch (err) {
    console.error("Failed to update order status:", err);
    alert("Failed to update order status.");
  }
};



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
                <th>Per Unit Price (₹)</th>
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
                  <td>{order.productId?.p_detail || "N/A"}</td>
                  <td>{order.price}</td>
                  <td>{order.quantity}</td>
                  <td>{order.address}</td>
                  <td>{order.quantity * order.price}</td>
                  <td>
                    {order.status === "Pending" ? (
                      <div className="d-flex flex-column gap-2">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => updateOrderStatus(order._id, "Shipped")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => updateOrderStatus(order._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="fw-semibold">
                        {order.status === "Shipped" && (
                          <span className="text-primary">Approved</span>
                        )}
                        {order.status === "Rejected" && (
                          <span className="text-danger">Rejected</span>
                        )}
                        {order.status === "Delivered" && (
                          <span className="text-success">Delivered</span>
                        )}
                      </div>
                    )}
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
