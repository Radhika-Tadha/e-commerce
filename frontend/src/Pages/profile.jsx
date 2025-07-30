import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaUserShield } from "react-icons/fa";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState(null);

    useEffect(() => {
  const fetchData = async () => {
    try {
      const [userRes, ordersRes] = await Promise.all([
        axios.get("http://localhost:8000/api/user/getUser", {
          withCredentials: true,
        }),
        // axios.get("http://localhost:8000/api/order/my-orders", {
        //   withCredentials: true,
        // }),
      ]);

      setUser(userRes.data.user);
      setOrders(ordersRes.data.orders); // assuming orders response shape
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  fetchData();
}, []);


    if (!user)
        return <p className="text-center mt-5 text-muted">Loading profile...</p>;

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
                <div className="text-center">
                    <img
                        src={`https://ui-avatars.com/api/?name=${user.name}&background=0F385C&color=fff&size=128`}
                        alt="avatar"
                        className="rounded-circle mb-3"
                        style={{ width: "100px", height: "100px" }}
                    />
                    <h4 className="mb-0">{user.name}</h4>
                    <p className="text-muted">{user.role || "User"}</p>
                </div>
                <hr />
                <div className="mt-3">
                    <p>
                        <FaUser className="me-2 text-primary" />
                        <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                        <FaEnvelope className="me-2 text-primary" />
                        <strong>Email:</strong> {user.email}
                    </p>
                    {/* <p>
                        <FaEnvelope className="me-2 text-primary" />
                        <strong>Address:</strong> {orders.address}
                    </p> */}
                    <p>
                        <FaUserShield className="me-2 text-primary" />
                        <strong>Role:</strong> {user.role || "User"}
                    </p>
                </div>
            </div>
        </div>
    );
}
