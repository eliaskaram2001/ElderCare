import React, { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "CLIENT", location: "", bio: "", phone: "" });
    const navigate = useNavigate();

    // Handle input changes
    const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // Handle form submission
    const handleRegister = async () => {
        if (!form.fullName || !form.email || !form.password) return alert("Please fill required fields");
        try {
            await API.post("/auth/register", form);
            navigate("/login");
        } catch (err) { alert("Registration failed."); }
    };

    return (
        <div className="boss-login-container">
            <div className="boss-login-card-wrapper" style={{ height: '650px' }}>

                <div className="boss-login-banner">
                    <h2 style={{ color: '#00bebd', fontWeight: '800', marginBottom: '40px' }}>Join Us</h2>
                    <div className="boss-promo-item">
                        <div className="boss-promo-icon"><i className="bi bi-person-check-fill"></i></div>
                        <div><h5 style={{fontWeight:'bold'}}>Trusted</h5><p style={{fontSize:'13px', color:'#888'}}>Community vetted caregivers.</p></div>
                    </div>
                    <div className="boss-promo-item">
                        <div className="boss-promo-icon"><i className="bi bi-heart-fill"></i></div>
                        <div><h5 style={{fontWeight:'bold'}}>Caring</h5><p style={{fontSize:'13px', color:'#888'}}>Support for your loved ones.</p></div>
                    </div>
                </div>

                <div className="boss-login-form-area" style={{ overflowY: 'auto' }}>
                    <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Create Account</h3>

                    <div className="boss-login-tabs">
                        <div className={`boss-tab-item ${form.role==='CLIENT'?'active':''}`} onClick={()=>setForm({...form, role:'CLIENT'})}>I need Care</div>
                        <div className={`boss-tab-item ${form.role==='PROVIDER'?'active':''}`} onClick={()=>setForm({...form, role:'PROVIDER'})}>I offer Care</div>
                    </div>

                    <div className="row g-2">
                        <div className="col-6"><input name="fullName" className="boss-login-input" placeholder="Full Name" onChange={update} /></div>
                        <div className="col-6"><input name="phone" className="boss-login-input" placeholder="Phone" onChange={update} /></div>
                    </div>
                    <input name="email" className="boss-login-input" placeholder="Email Address" onChange={update} />
                    <input type="password" name="password" className="boss-login-input" placeholder="Password" onChange={update} />
                    <input name="location" className="boss-login-input" placeholder="City, State" onChange={update} />

                    <button className="btn-boss-full" onClick={handleRegister}>Sign Up</button>

                    <div className="text-center mt-3">
                        <span style={{ color: '#666', fontSize:'14px' }}>Already have an account? </span>
                        <Link to="/login" style={{ color: '#00bebd', fontWeight: '600' }}>Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;