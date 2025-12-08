import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
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
    const colors = ["#FFB6C1", "#87CEFA", "#90EE90", "#FFA07A", "#BA55D3"];
    return colors[(name || "A").charCodeAt(0) % colors.length];
};

function NavBar({ user, setUser }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const isActive = (path) => (location.pathname === path ? "active" : "");

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem("eldercare_user");
            setUser(null); // 清空全局状态
            setShowMenu(false);
            navigate("/"); // 回到首页
        }
    };

    if (location.pathname === "/login" || location.pathname === "/register") return null;

    return (
        <header className="boss-white-header">
            <div style={{ display: "flex", alignItems: "center" }}>
                <Link to="/" className="boss-logo" style={{ textDecoration: 'none' }}>ElderCare</Link>
                <nav className="boss-nav-menu">
                    <Link to="/" className={isActive("/")}>
                        Home
                    </Link>
                    <Link to="/marketplace" className={isActive("/marketplace")}>
                        Jobs
                    </Link>
                    <Link to="/my-activities" className={isActive("/my-activities")}>
                        Activities
                    </Link>
                </nav>
            </div>

            <div className="boss-header-right">
                {user && user.role === "CLIENT" && (
                    <Link to="/create-post" className="btn-boss" style={{ color: "white", textDecoration: 'none' }}>
                        Post Job
                    </Link>
                )}
                <i className="bi bi-chat-dots-fill" style={{ cursor: "pointer", fontSize: '18px', color: '#666' }}></i>

                {user ? (
                    <div style={{ position: 'relative' }} ref={menuRef}>
                        <div
                            onClick={() => setShowMenu(!showMenu)}
                            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", userSelect: 'none' }}
                        >
                            <div
                                className="boss-avatar-small"
                                style={{ background: getAvatarColor(user.fullName) }}
                            >
                                {user.fullName?.charAt(0)}
                            </div>
                            <span style={{ fontSize: "14px", color: "#333", fontWeight: '500' }}>{user.fullName}</span>
                            <i className="bi bi-caret-down-fill" style={{ fontSize: '10px', color: '#999' }}></i>
                        </div>

                        {showMenu && (
                            <div className="boss-dropdown-menu" style={{
                                position: 'absolute',
                                top: '50px',
                                right: '0',
                                background: 'white',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                borderRadius: '8px',
                                width: '220px',
                                padding: '8px 0',
                                zIndex: 1000,
                                border: '1px solid #eee'
                            }}>
                                <div style={{ padding: '10px 20px', borderBottom: '1px solid #f0f0f0', marginBottom: '5px' }}>
                                    <div style={{ fontWeight: 'bold', color: '#333' }}>{user.fullName}</div>
                                    <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>
                                        {user.role === 'CLIENT' ? 'Client Account' : 'Caregiver Account'}
                                    </div>
                                </div>

                                <div
                                    className="boss-menu-item-hover"
                                    onClick={() => { setShowMenu(false); navigate('/profile'); }}
                                    style={{ padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#555' }}
                                >
                                    <i className="bi bi-person-gear"></i> My Profile
                                </div>

                                <div
                                    className="boss-menu-item-hover"
                                    onClick={handleLogout}
                                    style={{ padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#ff4d4f', borderTop: '1px solid #f0f0f0', marginTop: '5px' }}
                                >
                                    <i className="bi bi-box-arrow-right"></i> Log Out
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                        <Link to="/login" style={{ color: "#00bebd", fontWeight: "600", textDecoration: 'none' }}>
                            Log In
                        </Link>
                        <Link to="/register" className="btn-boss-outline" style={{ textDecoration: 'none' }}>
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

function  App () {
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("eldercare_user");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    }) ;

    return (
        <BrowserRouter>
            <NavBar user={user} setUser={setUser} />
            <Routes>
                <Route path="/" element={<Welcome user={user} />} />
                <Route path="/marketplace" element={<Marketplace user={user} />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register setUser={setUser} />} />
                <Route path="/create-post" element={<CreatePost user={user} />} />
                <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
                <Route path="/post/:id" element={<ServiceDetail user={user} />} />
                <Route path="/my-activities" element={<MyActivities user={user} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App ;