import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
    const navigator = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const res = await axios.post("http://localhost:8000/api/auth/signup", form,);
            alert(res.data.message);
            navigator("/Login");

        } catch (err) {
            console.log("signup faild", err);
            alert(err.response?.data?.message || "Signup failed");
        }
    };
    return (
        <div>
            <>
                <div className="container vh-90 d-flex align-items-center justify-content-center">
                    <div className="row " style={{ width: "90%", maxWidth: "600px", height: "500px" }}>

                        <div className=" bg-white p-4 rounded-end"><br></br>
                            <h3 className="mb-4" style={{ color: "red" }}>Create your account</h3>
                            <form onSubmit={handleSubmit} ><br></br>

                                <div className="mb-3 text-start">
                                    <input type="text" name="name" className="form-control rounded-pill shadow-none p-2 mr-2" value={form.name} onChange={handleChange} id="name" autoComplete="name" placeholder="Enter Full Name" />
                                </div><br></br>

                                <div className="mb-3 text-start">
                                    <input type="email" name="email" className="form-control rounded-pill shadow-none p-2" value={form.email} onChange={handleChange} id="email" autoComplete="username" placeholder="Enter email" />
                                </div><br></br>

                                <div className="mb-3 text-start d-flex">
                                    <input type={showPassword ? "text" : "password"} name="password" className="form-control rounded-pill shadow-none pe-5 p-2" value={form.password} onChange={handleChange} id="password"
                                        autoComplete="current-password"
                                        placeholder="Enter password" />
                                    <span
                                        className="input-group-text bg-white p-0 border-0"
                                        style={{ marginLeft: "-45px", cursor: "pointer", zIndex: 10 }}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                    </span>
                                </div>

                                <div className="form-check text-start">
                                    <input className="form-check-input" style={{ color: "red" }} type="checkbox" value="" id="checkChecked" />
                                    <label className="form-check-label" htmlFor="checkChecked">Remember Me</label>
                                </div>
                                <br></br>
                                <button type="submit" className="btn btn-danger w-100">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>

            </>
        </div>
    )
}