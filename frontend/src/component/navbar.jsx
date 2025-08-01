import React, { useState } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function Navbar({ isLoggin, setIsLoggin, user, setUser }) {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.cartItems || []);
    const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            navigate(`/AllProduct?search=${encodeURIComponent(searchTerm)}`);
        } else {
            navigate('/AllProduct');
        }
    };


    const handleLogout = async () => {
        if (window.confirm("Are you sure to Logout this site?")) {
            try {
                const res = await axios.post("http://localhost:8000/api/auth/logout", {}, {
                    withCredentials: true,
                });
                setUser(null);
                setIsLoggin(false);
                alert("logout succesfully");
                window.location.href = "/Login";
            } catch (err) {
                console.error("logout fail...", err);
            }
        }
    }
    const handleCartClick = () => {
        navigate("/cart"); //  Redirect to cart page
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg p-2 d-flex" style={{ backgroundColor: "white" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">DreamShop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <form className="d-flex" onSubmit={handleSearch}>
                            <div className="input-group" >
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                    {!isLoggin ? (
                        <ul className="navbar-nav ms-2">
                            <li><Link className="dropdown-item p-2" to="Signup">Signup</Link></li>
                            <li><Link className="dropdown-item p-2" to="Login">Login</Link></li>
                        </ul>
                    ) : (
                        <div className="icones d-flex align-items-center mt-2 gap-4">
                            {/* Profile Dropdown */}
                            <div className="dropdown">
                                <button
                                    className="btn btn-light p-0 border-0"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ width: '40px', height: '40px' }}
                                >
                                    <i className="bi bi-person-circle fs-4"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link className="dropdown-item" to="/Profile">Profile</Link></li>
                                    <li>
                                        <Link to="/MyOrders" className="dropdown-item">
                                            Orders
                                        </Link>
                                    </li>
                                    <li><Link className="dropdown-item" onClick={handleLogout} to="#">Logout</Link></li>
                                </ul>
                            </div>
                            {/* Cart Icon */}
                            {user?.role === "user" && (
                                <>
                                    <div className="cart" onClick={handleCartClick} >
                                        <div className="cart-icon">
                                            <Link to="/cart" className="position-relative me-3">
                                                <i className="bi bi-cart-plus fs-4"></i>
                                                {totalQty > 0 && (
                                                    <span
                                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                                        style={{ fontSize: "0.7rem" }}
                                                    >
                                                        {totalQty}
                                                    </span>
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </nav>
            {/* menu navbar */}
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">DreamShop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item nav-hover">
                                <Link className="nav-link active " aria-current="page" to="/Home">Dashboard</Link>
                            </li>
                            {user?.role === "user" && (
                                <>
                                    <li className="nav-item nav-hover">
                                        <Link className="nav-link" to="/AllProduct">Shop Now</Link>
                                    </li>
                                    <li className="nav-item nav-hover">
                                        <Link className="nav-link" to="/AboutUs">AboutUs</Link>
                                    </li>
                                    <li className="nav-item nav-hover">
                                        <Link className="nav-link" to="/ContactUs">ContactUs</Link>
                                    </li>
                                </>
                            )}
                            {user?.role === "admin" && (
                                <>
                                    <li className="nav-item nav-hover">
                                        <Link className="nav-link active " aria-current="page" to="/ProductPage">Products</Link>
                                    </li>
                                    <li className="nav-item nav-hover">
                                        <Link className="nav-link active " aria-current="page" to="/Order">Orders</Link>
                                    </li>
                                    <li className="nav-item nav-hover">
                                        <Link className="nav-link active " aria-current="page" to="/FetchUser">Users</Link>
                                    </li>
                                    <li className="nav-item nav-hover">
                                        <Link className="nav-link" to="/AddProduct">AddProduct</Link>
                                    </li>
                                </>
                            )}
                            {/* user navbar */}
                        </ul>
                    </div>
                </div>
            </nav>


        </>
    )
}