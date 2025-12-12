import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roleTab, setRoleTab] = useState("CLIENT");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) return alert("Please enter email and password");
        try {
            const response = await API.post("/auth/login", { email, password });

            const user = response.data;
            if(user.password) {
                delete user.password;
            }

            setUser(user);
            localStorage.setItem("eldercare_user", JSON.stringify(user));
            navigate("/marketplace");
        } catch (err) {
            alert("Invalid login credentials.");
        }
    };

    return (
        <div className="boss-login-container">
            <div className="boss-login-card-wrapper">
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
                            <i className="bi bi-chat-dots-fill"></i>
                        </div>
                        <div>
                            <h5
                                style={{
                                    fontWeight: "bold",
                                    marginBottom: "4px",
                                    color: "#333",
                                }}
                            >
                                Direct Chat
                            </h5>
                            <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
                                Chat directly with caregivers anytime.
                            </p>
                        </div>
                    </div>

                    <div className="boss-promo-item">
                        <div className="boss-promo-icon">
                            <i className="bi bi-briefcase-fill"></i>
                        </div>
                        <div>
                            <h5
                                style={{
                                    fontWeight: "bold",
                                    marginBottom: "4px",
                                    color: "#333",
                                }}
                            >
                                Match
                            </h5>
                            <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
                                Find the perfect match in seconds.
                            </p>
                        </div>
                    </div>

                    <div className="boss-promo-item">
                        <div className="boss-promo-icon">
                            <i className="bi bi-shield-check"></i>
                        </div>
                        <div>
                            <h5
                                style={{
                                    fontWeight: "bold",
                                    marginBottom: "4px",
                                    color: "#333",
                                }}
                            >
                                NEW YORK STATE
                            </h5>
                            <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
                                Now Available in New York State!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="boss-login-form-area">
                    <div className="boss-qr-corner">
                        <i
                            className="bi bi-qr-code-scan"
                            style={{ fontSize: "30px", color: "#00bebd" }}
                        ></i>
                    </div>

                    <h3
                        style={{
                            marginBottom: "30px",
                            fontWeight: "bold",
                            color: "#333",
                        }}
                    >
                        Login / Register
                    </h3>

                    <div className="boss-login-tabs">
                        <div
                            className={`boss-tab-item ${
                                roleTab === "CLIENT" ? "active" : ""
                            }`}
                            onClick={() => setRoleTab("CLIENT")}
                        >
                            I Need Care
                        </div>
                        <div
                            className={`boss-tab-item ${
                                roleTab === "PROVIDER" ? "active" : ""
                            }`}
                            onClick={() => setRoleTab("PROVIDER")}
                        >
                            I Provide Care
                        </div>
                    </div>

                    <div className="boss-input-group">
                        <div style={{ position: "relative" }}>
              <span
                  style={{
                      position: "absolute",
                      left: "15px",
                      top: "14px",
                      color: "#999",
                  }}
              >
                <i className="bi bi-envelope"></i>
              </span>
                            <input
                                placeholder="Email Address"
                                className="boss-login-input"
                                style={{ paddingLeft: "45px" }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="boss-input-group">
                        <div style={{ position: "relative" }}>
              <span
                  style={{
                      position: "absolute",
                      left: "15px",
                      top: "14px",
                      color: "#999",
                  }}
              >
                <i className="bi bi-lock"></i>
              </span>
                            <input
                                type="password"
                                placeholder="Password"
                                className="boss-login-input"
                                style={{ paddingLeft: "45px" }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div style={{ textAlign: "right", marginTop: "8px" }}>
                        </div>
                    </div>

                    <button className="btn-boss-full" onClick={handleLogin}>
                        Log In
                    </button>

                    <div style={{ textAlign: "center", marginTop: "20px" }}>

                        <div style={{ marginTop: "10px" }}>
                            <i
                                className="bi bi-wechat"
                                style={{
                                    fontSize: "28px",
                                    color: "#09bb07",
                                    cursor: "pointer",
                                    marginRight: "20px",
                                }}
                            ></i>
                            <i
                                className="bi bi-google"
                                style={{
                                    fontSize: "24px",
                                    color: "#db4437",
                                    cursor: "pointer",
                                }}
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;