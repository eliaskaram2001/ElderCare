import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Marketplace from "./pages/Marketplace";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import ServiceDetail from "./pages/ServiceDetail";
import MyActivities from "./pages/MyActivities";
import "./App.css";

const getAvatarColor = (name) => {
    const colors = ['#FFB6C1', '#87CEFA', '#90EE90', '#FFA07A', '#BA55D3'];
    return colors[(name || 'A').charCodeAt(0) % colors.length];
};

function NavBar({ user }) {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? "active" : "";

    if (location.pathname === "/login" || location.pathname === "/register") return null;

    return (
        <header className="boss-white-header">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="boss-logo">ElderCare</div>
                <nav className="boss-nav-menu">
                    <Link to="/" className={isActive("/")}>Home</Link>
                    <Link to="/marketplace" className={isActive("/marketplace")}>Jobs</Link>
                    <Link to="/my-activities" className={isActive("/my-activities")}>Activities</Link>
                </nav>
            </div>

            <div className="boss-header-right">
                {user && user.role === 'CLIENT' && (
                    <Link to="/create-post" className="btn-boss" style={{color:'white'}}>Post Job</Link>
                )}
                <i className="bi bi-chat-dots-fill" style={{cursor:'pointer'}}></i>

                {user ? (
                    <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="boss-avatar-small" style={{ background: getAvatarColor(user.fullName) }}>
                            {user.fullName.charAt(0)}
                        </div>
                        <span style={{fontSize: '14px', color: '#333'}}>{user.fullName}</span>
                    </Link>
                ) : (
                    <div style={{display:'flex', gap:'15px', alignItems:'center'}}>
                        <Link to="/login" style={{ color: '#00bebd', fontWeight: '600' }}>Log In</Link>
                        <Link to="/register" className="btn-boss-outline">Sign Up</Link>
                    </div>
                )}
            </div>
        </header>
    );
}

function App() {
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter>
            <NavBar user={user} />
            <Routes>
                <Route path="/" element={<Welcome user={user} />} />
                <Route path="/marketplace" element={<Marketplace user={user} />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-post" element={<CreatePost user={user} />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/post/:id" element={<ServiceDetail user={user} />} />
                <Route path="/my-activities" element={<MyActivities user={user} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;