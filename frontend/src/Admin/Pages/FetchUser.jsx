import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FetchUser() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/all", {
          withCredentials: true,
        });
        setUsers(res.data.users); // ✅ backend must return { users: [...] }
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
              <th>Address</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`http://localhost:8000/uploads/${u.image}`}
                    alt={u.name}
                    width="40"
                    height="40"
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                </td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address}</td>
                <td>{u.role || "user"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
