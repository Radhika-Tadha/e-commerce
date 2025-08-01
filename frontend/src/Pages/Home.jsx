import React, { useState, useEffect } from "react";
import HeroImg from "../Assets/HeroImg.png";
import Categorycard from "../component/CategoryCard";
import axios from "axios";

export default function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/getUser", {
            withCredentials: true,
        })
            .then(res => setUser(res.data.user))
            .catch(err => console.log(err.response?.data?.message));
    }, []);


    return (
        <>
            <div className="Hero-section d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#eaf7ff", padding: "40px" }}>
                <div className="m-5 p-5">
                    <h1>This is Home page</h1>
                    <h2>{user ? `Welcome, ${user.name}` : "Loading user..."}</h2>
                </div>

                <div className="img mx-2 p-2">
                    <img
                        src={HeroImg}
                        alt="Image"
                        className="img img-fluid" style={{ width: "350px", height: "auto" }}></img>
                </div>
            </div>
            {/* Category Section */}
            <div className="category mt-5 px-4">
                <Categorycard />
            </div>
        </>
    )
}   