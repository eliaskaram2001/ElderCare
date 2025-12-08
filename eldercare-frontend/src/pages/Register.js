import React, { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

function Register({ setUser }) {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "CLIENT",
        location: "",
        bio: "",
        phone: "",
    });

    const navigate = useNavigate();

    const update = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/register", form);
            const user = res.data;
            setUser(user);
            localStorage.setItem("eldercare_user", JSON.stringify(user));
            navigate("/profile");
        } catch (err) {
            alert(err.response?.data || "Error in registration process");
        }
    };

    return (
        <div className="d-flex justify-content-start align-items-center vh-100 flex-column p-5">
            <h1 className="mb-3">Create Account</h1>
            <div className="d-flex flex-column" style={{ maxWidth: 400, width: "100%" }}>
                <input
                    name="fullName"
                    placeholder="Full Name"
                    onChange={update}
                    className="mb-4 form-control"
                />
                <input
                    name="email"
                    placeholder="Email"
                    onChange={update}
                    className="mb-4 form-control"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={update}
                    className="mb-4 form-control"
                />
                <select
                    name="role"
                    onChange={update}
                    className="mb-4 form-select"
                    value={form.role}
                >
                    <option value="CLIENT">Client</option>
                    <option value="PROVIDER">Provider</option>
                </select>
                <input
                    name="location"
                    placeholder="Location"
                    onChange={update}
                    className="mb-4 form-control"
                />
                <input
                    name="phone"
                    placeholder="Phone"
                    onChange={update}
                    className="mb-3 form-control"
                />
                <textarea
                    name="bio"
                    placeholder="Short bio"
                    onChange={update}
                    className="mb-4 form-control"
                />

                <button
                    type="submit"
                    onClick={handleRegister}
                    className="btn btn-primary mb-2"
                >
                    Register
                </button>
                <p>
                    Already have an account?{" "}
                    <Link to="/login">Log in here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
