import React, { useEffect, useState } from "react";
import axios from "axios";
// import { FaUser, FaEnvelope, FaUserShield } from "react-icons/fa";

export default function FetchUser() {
  const [users, setUsers] = useState([]);
  // const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/all", {
          withCredentials: true,
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);


  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-primary">
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Address</th> */}
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              // const order = orders.find(o => o.userId?.toString() === user._id?.toString());
              return (
                <tr key={index}>
                  <td>
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=0F385C&color=fff&size=128`}
                      alt={user.image}
                      width="40"
                      height="40"
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {/* <td>{order?.address || "No address"}</td> */}
                  <td>{user.role || "user"}</td>
                </tr>
              );
            })}

          </tbody>
        </table>
      )}
    </div>
  );
}
