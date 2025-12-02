import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function CreatePost({ user }) {
    // Form states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    // Handle form submission
    const submit = async () => {
        if(!title || !description || !location) return alert("All fields are required");

        try {
            await API.post("/posts", {
                clientId: user.id,
                title,
                description,
                location,
                price: price || "$25/hr"
            });
            alert("Success! Your care request has been posted.");
            navigate("/marketplace");
        } catch (error) {
            alert("Failed to create post.");
        }
    };

    // Permission check: Only CLIENT can access this page
    if (!user || user.role !== "CLIENT") {
        return (
            <div className="container mt-5" style={{ display: 'flex', justifyContent: 'center', paddingTop: '100px' }}>
                <div className="boss-card p-5 text-center" style={{ width: '500px' }}>
                    <div style={{ fontSize: '48px', color: '#ff4d4f', marginBottom: '20px' }}>
                        <i className="bi bi-shield-lock-fill"></i>
                    </div>
                    <h3 style={{ fontWeight: 'bold', color: '#333' }}>Access Denied</h3>
                    <p style={{ color: '#666', marginTop: '10px' }}>Only registered <strong>Clients</strong> can post care requests.</p>
                    <button className="btn-boss mt-4" onClick={() => navigate('/marketplace')}>Back to Jobs</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: '#f6f6f8', minHeight: 'calc(100vh - 60px)', padding: '40px 0' }}>
            <div className="container" style={{ maxWidth: '1000px', display: 'flex', gap: '20px' }}>

                <div style={{ flex: 1 }}>
                    <div className="boss-card">
                        <div style={{ borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '30px' }}>
                            <h3 style={{ fontWeight: '800', color: '#333', margin: 0 }}>Post a New Job</h3>
                            <p style={{ color: '#999', margin: '5px 0 0 0', fontSize: '14px' }}>Find the perfect caregiver for your loved ones.</p>
                        </div>

                        <div className="mb-4">
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Job Title</label>
                            <input
                                className="boss-input"
                                placeholder="e.g. Elderly Care Assistant needed for weekends"
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Location</label>
                                <div style={{ position: 'relative' }}>
                                    <i className="bi bi-geo-alt" style={{ position: 'absolute', left: '15px', top: '12px', color: '#999' }}></i>
                                    <input
                                        className="boss-input"
                                        style={{ paddingLeft: '40px' }}
                                        placeholder="City, State"
                                        onChange={(e)=>setLocation(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Hourly Rate</label>
                                <div style={{ position: 'relative' }}>
                                    <i className="bi bi-currency-dollar" style={{ position: 'absolute', left: '15px', top: '12px', color: '#999' }}></i>
                                    <input
                                        className="boss-input"
                                        style={{ paddingLeft: '40px' }}
                                        placeholder="e.g. 25-30"
                                        onChange={(e)=>setPrice(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Job Description</label>
                            <textarea
                                className="boss-input"
                                rows="8"
                                placeholder="Describe daily tasks, schedule requirements, and specific needs (e.g. medication reminders, cooking, driving)..."
                                onChange={(e)=>setDescription(e.target.value)}
                                style={{ resize: 'vertical', lineHeight: '1.6' }}
                            ></textarea>
                        </div>

                        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'right' }}>
                            <button className="btn-boss-outline" style={{ marginRight: '15px' }} onClick={() => navigate('/marketplace')}>Cancel</button>
                            <button className="btn-boss" style={{ padding: '10px 40px', fontSize: '16px' }} onClick={submit}>
                                Publish Now
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ width: '320px' }}>
                    <div className="boss-card" style={{ background: '#e0f7fa', border: '1px solid #b2ebf2' }}>
                        <h5 style={{ color: '#006064', fontWeight: 'bold', marginBottom: '15px' }}>
                            <i className="bi bi-lightbulb me-2"></i> Posting Tips
                        </h5>
                        <ul style={{ paddingLeft: '20px', color: '#00838f', fontSize: '14px', lineHeight: '1.8' }}>
                            <li className="mb-2"><strong>Be Clear:</strong> Specific titles attract better matches.</li>
                            <li className="mb-2"><strong>Details Matter:</strong> Mention hours, location, and specific care needs.</li>
                            <li className="mb-2"><strong>Requirements:</strong> List certifications (CPR, Nursing) if needed.</li>
                            <li><strong>Safety:</strong> Do not include personal phone numbers in the description.</li>
                        </ul>
                    </div>

                    <div className="boss-card text-center">
                        <div style={{ fontSize: '40px', color: '#00bebd', marginBottom: '10px' }}>
                            <i className="bi bi-shield-check"></i>
                        </div>
                        <h5 style={{ fontWeight: 'bold' }}>Safe & Secure</h5>
                        <p style={{ fontSize: '13px', color: '#666' }}>All caregivers are background checked for your peace of mind.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CreatePost;