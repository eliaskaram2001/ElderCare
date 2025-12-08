import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

const Welcome = ({ user }) => {
    const navigate = useNavigate();
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [hotJobs, setHotJobs] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        API.get("/posts")
            .then(res => setHotJobs(res.data.slice(0, 6)))
            .catch(err => console.error(err));
    }, []);

    const categories = [
        { id: 1, name: "Medical & Nursing", subCategories: ["RN", "LPN", "Therapist"] },
        { id: 2, name: "Daily Assistance", subCategories: ["Cleaning", "Cooking", "Shopping"] },
        { id: 3, name: "Companionship", subCategories: ["Walking", "Reading", "Chat"] },
    ];

    const handleSearch = () => {
        const q = searchInput.trim();
        if (!q) {
            navigate("/marketplace");
        } else {
            navigate(`/marketplace?q=${encodeURIComponent(q)}`);
        }
    };

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '50px' }}>
            <div className="boss-search-banner">
                <div className="boss-search-box">
                    <div
                        style={{
                            padding: '0 20px',
                            display:'flex',
                            alignItems:'center',
                            background:'#f8f9fa',
                            color:'#666',
                            fontSize:'14px',
                            borderRight:'1px solid #eee'
                        }}
                    >
                        Job Type <i className="bi bi-caret-down-fill ms-2"></i>
                    </div>
                    <input
                        className="boss-search-input"
                        placeholder="Search for jobs..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button className="boss-search-btn" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>

            <div className="boss-main-container">
                <div
                    className="boss-sidebar"
                    onMouseLeave={() => setHoveredCategory(null)}
                >
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="boss-menu-item"
                            onMouseEnter={() => setHoveredCategory(cat)}
                        >
                            <span>{cat.name}</span>
                            <i className="bi bi-chevron-right" style={{ color: '#ddd' }}></i>
                        </div>
                    ))}

                    {hoveredCategory && (
                        <div className="boss-mega-menu visible">
                            <h4
                                style={{
                                    color: '#00bebd',
                                    marginBottom: '20px'
                                }}
                            >
                                {hoveredCategory.name}
                            </h4>
                            <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
                                {hoveredCategory.subCategories.map((sub, i) => (
                                    <span
                                        key={i}
                                        className="boss-tag"
                                        onClick={() => navigate('/marketplace')}
                                    >
                                        {sub}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="boss-banner-area">
                    <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>ElderCare PRO</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Connecting Families with Caregivers</p>
                    {!user && (
                        <button
                            className="btn btn-light mt-3"
                            style={{ color: '#00bebd', fontWeight: 'bold' }}
                            onClick={() => navigate('/register')}
                        >
                            Join Now
                        </button>
                    )}
                </div>

                <div className="boss-right-sidebar">
                    <div className="boss-mini-card">
                        {user ? (
                            <div>
                                <div
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        background: '#00bebd',
                                        borderRadius: '50%',
                                        margin: '0 auto 15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '24px'
                                    }}
                                >
                                    {user.fullName?.charAt(0)}
                                </div>
                                <h5>Hi, {user.fullName}</h5>
                                <p style={{ fontSize: '13px', color: '#666' }}>
                                    {user.role === 'CLIENT'
                                        ? 'Ready to find help?'
                                        : 'Ready to work?'}
                                </p>
                                <button
                                    className="btn-boss w-100"
                                    onClick={() => navigate('/profile')}
                                >
                                    My Profile
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        background: '#e0f7fa',
                                        borderRadius: '50%',
                                        margin: '0 auto 15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#00bebd',
                                        fontSize: '24px'
                                    }}
                                >
                                    <i className="bi bi-person-fill"></i>
                                </div>
                                <button
                                    className="btn-boss w-100 mb-2"
                                    onClick={() => navigate('/login')}
                                >
                                    Log In
                                </button>
                                <button
                                    className="btn-boss-outline w-100"
                                    onClick={() => navigate('/register')}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mt-5" style={{ maxWidth: '1200px' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Hot Jobs</h3>
                <div className="boss-job-grid">
                    {hotJobs.map(job => (
                        <div
                            key={job.id}
                            className="boss-card"
                            onClick={() => navigate(`/post/${job.id}`)}
                        >
                            <div
                                style={{
                                    display:'flex',
                                    justifyContent:'space-between',
                                    marginBottom:'10px'
                                }}
                            >
                                <h5 style={{fontWeight:'bold'}}>{job.title}</h5>
                                <span style={{color:'#00bebd'}}>
                                    {job.price || "$25/hr"}
                                </span>
                            </div>
                            <p style={{fontSize:'13px', color:'#666'}}>
                                {job.location}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Welcome;
