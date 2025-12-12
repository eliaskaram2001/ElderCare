import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Register({ setUser }) {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "CLIENT",
        location: "",
        phone: "",
        bio: ""
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
            alert(err.response?.data || "Registration failed.");
        }
    };

    return (
        <div
            className="boss-login-container"
            style={{ minHeight: "100vh", overflowY: "auto" }}   // ⭐ FIX: allow scrolling
        >
            <div className="boss-login-card-wrapper">

                {/* LEFT SIDE (same as login page) */}
                <div className="boss-login-banner">
                    <h2
                        style={{
                            color: "#00bebd",
                            fontWeight: "800",
                            marginBottom: "50px",
                            fontSize: "32px",
                        }}
                    >
                        ElderCare
                    </h2>

                    <div className="boss-promo-item">
                        <div className="boss-promo-icon">
                            <i className="bi bi-heart-fill"></i>
                        </div>
                        <div>
                            <h5 style={{ fontWeight: "bold", marginBottom: 4, color: "#333" }}>
                                NEW YORK STATE
                            </h5>
                            <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
                                now available in NEW York State!
                            </p>
                        </div>
                    </div>

                    <div className="boss-promo-item">
                        <div className="boss-promo-icon">
                            <i className="bi bi-geo-alt-fill"></i>
                        </div>
                        <div>
                            <h5 style={{ fontWeight: "bold", marginBottom: 4, color: "#333" }}>
                                Local Experts
                            </h5>
                            <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
                                Find caregivers near you.
                            </p>
                        </div>
                    </div>

                    <div className="boss-promo-item">
                        <div className="boss-promo-icon">
                            <i className="bi bi-shield-check"></i>
                        </div>
                        <div>
                            <h5 style={{ fontWeight: "bold", marginBottom: 4, color: "#333" }}>
                                Perfect Match
                            </h5>
                            <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
                                Find the perfect match in seconds.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE FORM */}
                <div
                    className="boss-login-form-area"
                    style={{ overflowY: "auto", paddingBottom: "40px" }}   // ⭐ FIX: let form scroll
                >
                    <div className="boss-qr-corner">
                        <i
                            className="bi bi-qr-code-scan"
                            style={{ fontSize: "30px", color: "#00bebd" }}
                        ></i>
                    </div>

                    <h3 style={{ marginBottom: 30, fontWeight: "bold", color: "#333" }}>
                        Create Your Account
                    </h3>

                    {/* ROLE TABS */}
                    <div className="boss-login-tabs">
                        <div
                            className={`boss-tab-item ${form.role === "CLIENT" ? "active" : ""}`}
                            onClick={() => setForm({ ...form, role: "CLIENT" })}
                        >
                            I Need Care
                        </div>
                        <div
                            className={`boss-tab-item ${form.role === "PROVIDER" ? "active" : ""}`}
                            onClick={() => setForm({ ...form, role: "PROVIDER" })}
                        >
                            I Provide Care
                        </div>
                    </div>

                    {/* FULL NAME */}
                    <div className="boss-input-group">
                        <div style={{ position: "relative" }}>
                            <i className="bi bi-person"
                               style={{ position: "absolute", left: 15, top: 14, color: "#999" }}></i>
                            <input
                                name="fullName"
                                placeholder="Full Name"
                                className="boss-login-input"
                                onChange={update}
                                style={{ paddingLeft: 45 }}
                            />
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className="boss-input-group">
                        <div style={{ position: "relative" }}>
                            <i className="bi bi-envelope"
                               style={{ position: "absolute", left: 15, top: 14, color: "#999" }}></i>
                            <input
                                name="email"
                                placeholder="Email Address"
                                className="boss-login-input"
                                onChange={update}
                                style={{ paddingLeft: 45 }}
                            />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="boss-input-group">
                        <div style={{ position: "relative" }}>
                            <i className="bi bi-lock"
                               style={{ position: "absolute", left: 15, top: 14, color: "#999" }}></i>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="boss-login-input"
                                onChange={update}
                                style={{ paddingLeft: 45 }}
                            />
                        </div>
                    </div>

                    {/* LOCATION */}
                    <div className="boss-input-group">
                        <div style={{ position: "relative" }}>
                            <i className="bi bi-geo-alt"
                               style={{ position: "absolute", left: 15, top: 14, color: "#999" }}></i>
                            <input
                                name="location"
                                placeholder="City, State"
                                className="boss-login-input"
                                onChange={update}
                                style={{ paddingLeft: 45 }}
                            />
                        </div>
                    </div>

                    {/* PHONE */}
                    <div className="boss-input-group">
                        <div style={{ position: "relative" }}>
                            <i className="bi bi-telephone"
                               style={{ position: "absolute", left: 15, top: 14, color: "#999" }}></i>
                            <input
                                name="phone"
                                placeholder="Phone Number"
                                className="boss-login-input"
                                onChange={update}
                                style={{ paddingLeft: 45 }}
                            />
                        </div>
                    </div>

                    {/* BIO */}
                    <textarea
                        name="bio"
                        placeholder="Short bio"
                        className="boss-login-input"
                        style={{
                            height: 90,
                            resize: "none",
                            marginBottom: 20,
                            padding: 15,
                            lineHeight: 1.4
                        }}
                        onChange={update}
                    />

                    {/* REGISTER BUTTON */}
                    <button className="btn-boss-full" onClick={handleRegister}>
                        Register
                    </button>

                    {/* LOGIN LINK */}
                    <div style={{ textAlign: "center", marginTop: 15 }}>
                        <span style={{ fontSize: 13, color: "#777" }}>
                            Already have an account?{" "}
                            <Link to="/login" style={{ color: "#00bebd", fontWeight: 600 }}>
                                Log in here
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
