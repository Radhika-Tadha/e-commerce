import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/order/my-orders", {
          withCredentials: true
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="myOrdersPanel"
      aria-labelledby="myOrdersPanelLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="myOrdersPanelLabel">My Orders</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          orders.map((order, i) => (
            <div key={i} className="card mb-3 p-3 shadow-sm">
              <h5>{order.productId.title}</h5>
              <p>Price: ₹{order.price}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Address: {order.address}</p>
              <small>Ordered At: {new Date(order.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
