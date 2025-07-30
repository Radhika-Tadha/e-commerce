import React from 'react';
import Default from '../Assets/default.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);



    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/auth/me", {
                    headers: {
                        withCredentials: true,
                    },
                });
                console.log("Fetched user:", res.data.user);

                setUser(res.data.user);
                // navigate("/profile");
            } catch (err) {
                console.error("Fetch user failed", err.response?.data || err.message);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <h3 className="text-center mt-5">Please login to view profile.</h3>;
    }
    const imageUrl = user.image
        ? `http://localhost:8000/uploads/${user.image}` 
        : { Default };

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center mt-1">
            <div className="row shadow-lg rounded-end" style={{ width: "100%", maxWidth: "900px", height: "500px" }}>
                {/* LEFT SIDE - IMAGE */}
                <div className="col-md-4 d-none d-md-block p-5" style={{ background: "linear-gradient(to right,#d5967e, #a64528)" }}>
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className="rounded-circle"
                        width="180"
                        height="180"
                        style={{ objectFit: "cover" }}
                    /><br></br><br></br>
                    <h3 className="text-center mt-4" style={{ color: "white" }}>{user.name}</h3>
                    <br></br>
                    <strong style={{ color: "white" }} onClick={() => navigate("/edit-profile")}><i className="bi bi-pencil-square fs-5"></i>
                    </strong>


                </div>

                {/* RIGHT SIDE - FORM */}<br></br>
                <div className="col-md-8 p-5 bg-white rounded-end "><br></br>
                    <h3 className=" text-start border-0 border-bottom rounded-0 shadow-none" style={{ color: "#BB5A3A" }}>Information</h3>
                    <div className='row'>
                        <div className="col-sm-6 text-start text-muted border-0 border-bottom rounded-0 shadow-none">
                            <p className="mt-5 mb-0"><strong>Email: </strong>{user.email}</p>
                        </div><br></br>

                        <div className="col-sm-6 mb- text-start border-0 border-bottom rounded-0 shadow-none">
                            <p className="mt-5 mb-0"><strong>Mobile No.:</strong>{user.phone || "Not Provided"}</p>
                        </div><br></br>

                        <div className="col-sm-6 mb- text-start border-0 border-bottom rounded-0 shadow-none">
                            <p className="mt-5 mb-0"><strong>Date of Birth:</strong>{user.dob || "Not Provided"}</p>
                        </div><br></br>


                        <div className="col-sm-6 mb- text-start border-0 border-bottom rounded-0 shadow-none">
                            <p className="mt-5 mb-0"><strong>Bio :</strong>{user.bio || "Not Provided"}</p>
                        </div><br></br>

                        <ul className="mt-5 mb-0 list-unstyled d-flex gap-3">
                            <li>
                                <Link target='_self'><i className="bi bi-facebook fs-4 text-primary"></i></Link>
                            </li>
                            <li>
                                <Link target='_self'><i className="bi bi-instagram fs-4 text-danger"></i></Link>
                            </li>
                            <li>
                                <Link target='_self'><i className="bi bi-linkedin fs-4 text-info"></i></Link >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}

