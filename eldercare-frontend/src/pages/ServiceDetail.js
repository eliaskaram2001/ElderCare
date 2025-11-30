import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

function ServiceDetail({ user }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);

    useEffect(() => {
        API.get("/posts").then(res => {
            const foundJob = res.data.find(p => p.id.toString() === id);
            if (foundJob) {
                setJob(foundJob);
            } else {
                setJob({
                    id: id,
                    title: "Loading Job...",
                    description: "Please wait while we fetch the details.",
                    location: "...",
                    price: "...",
                    clientName: "..."
                });
            }
        }).catch(err => console.error(err));
    }, [id]);

    const handleApply = async () => {
        if (!job) return;

        try {
            await API.post("/bookings", {
                postId: job.id,
                postTitle: job.title,
                clientId: job.clientId || 1,
                clientName: job.clientName || "Client",
                providerId: user.id,
                providerName: user.fullName,
                status: "PENDING"
            });

            alert("Success! Job accepted. Check 'My Activities'.");
            navigate("/my-activities");
        } catch (error) {
            console.error(error);
            alert("Failed to accept job. Please try again.");
        }
    };

    const getAvatarColor = (name) => {
        const colors = ['#FFB6C1', '#87CEFA', '#90EE90', '#FFA07A', '#BA55D3'];
        return colors[(name || 'A').charCodeAt(0) % colors.length];
    };

    if (!job) return <div className="p-5 text-center">Loading...</div>;

    return (
        <div style={{ background: '#f6f6f8', minHeight: 'calc(100vh - 60px)', padding: '20px 0' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>

                <div className="boss-card mb-3" style={{ padding: '0', overflow: 'hidden' }}>
                    <div className="boss-detail-header-wrapper">
                        <div className="d-flex justify-content-between align-items-start">
                            <div style={{ flex: 1 }}>
                                <div className="d-flex align-items-center gap-3 mb-2">
                                    <h1 style={{ fontWeight: '800', color: '#333', fontSize: '28px', margin: 0 }}>{job.title}</h1>
                                    <span style={{ fontSize: '28px', color: '#fd5f39', fontWeight: 'bold' }}>
                                        {job.price || "$25 / hr"}
                                    </span>
                                </div>
                                <div className="d-flex gap-4 text-secondary mt-3" style={{ fontSize: '15px' }}>
                                    <span><i className="bi bi-geo-alt-fill"></i> {job.location}</span>
                                    <span><i className="bi bi-briefcase-fill"></i> 1-3 Years</span>
                                    <span><i className="bi bi-mortarboard-fill"></i> Certified</span>
                                </div>
                            </div>

                            <div style={{ width: '280px', textAlign: 'right' }}>
                                {!user ? (
                                    <button
                                        className="btn-boss w-100 py-3"
                                        style={{ fontSize: '16px' }}
                                        onClick={() => navigate('/login')}
                                    >
                                        Login to Apply
                                    </button>
                                ) : user.role === 'PROVIDER' ? (
                                    <button
                                        className="btn-boss w-100 py-3"
                                        style={{ fontSize: '16px' }}
                                        onClick={handleApply}
                                    >
                                        Accept / Apply Now
                                    </button>
                                ) : (
                                    <button
                                        className="btn-boss-outline w-100 py-3"
                                        style={{ fontSize: '16px' }}
                                        onClick={() => navigate('/my-activities')}
                                    >
                                        Manage My Post
                                    </button>
                                )}

                                <p className="mt-3 text-secondary small text-center mb-0">
                                    <i className="bi bi-shield-check text-success"></i> Payment Verified
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <div className="boss-card">
                            <div className="boss-recruiter-card-large" style={{ marginBottom: '30px' }}>
                                <div className="boss-avatar-large" style={{ background: getAvatarColor(job.clientName), width:'60px', height:'60px', fontSize:'24px' }}>
                                    {(job.clientName || "C").charAt(0)}
                                </div>
                                <div className="boss-recruiter-text ms-3">
                                    <h4 style={{ margin:0, fontWeight:'bold', fontSize:'18px' }}>
                                        {job.clientName || "Client"}
                                        <span className="boss-tag ms-2" style={{fontWeight:'normal'}}>Active</span>
                                    </h4>
                                    <p style={{ margin:0, color:'#666', fontSize:'14px' }}>ElderCare Verified Family • 5 Jobs Posted</p>
                                </div>
                                <button className="btn-boss-outline ms-auto btn-sm">Chat</button>
                            </div>

                            <h3 className="boss-section-title">Job Description</h3>
                            <div className="boss-description-text" style={{ whiteSpace: 'pre-wrap' }}>
                                {job.description || "No description provided."}
                                <br/><br/>
                                <strong>Responsibilities:</strong>
                                <ul>
                                    <li>Provide compassionate care and companionship.</li>
                                    <li>Assist with daily living activities as needed.</li>
                                    <li>Ensure safety and well-being at all times.</li>
                                </ul>
                                <strong>Requirements:</strong>
                                <ul>
                                    <li>Must be reliable and punctual.</li>
                                    <li>Prior experience in caregiving is preferred.</li>
                                    <li>Valid identification required.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="boss-card" style={{ background: '#fff', borderTop: '4px solid #00bebd' }}>
                            <h5 className="fw-bold mb-3">Safety Tips</h5>
                            <ul className="small text-secondary ps-3" style={{ lineHeight: '1.6' }}>
                                <li className="mb-2">Never transfer money outside the ElderCare platform.</li>
                                <li className="mb-2">Verify the identity of the caregiver upon arrival.</li>
                                <li className="mb-2">Report any suspicious activity to support.</li>
                            </ul>
                        </div>

                        <div className="boss-card">
                            <h5 className="fw-bold mb-3">Job Overview</h5>
                            <div className="d-flex justify-content-between mb-2 small text-secondary">
                                <span>Published</span>
                                <span>Today</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2 small text-secondary">
                                <span>Type</span>
                                <span>Full-time</span>
                            </div>
                            <div className="d-flex justify-content-between small text-secondary">
                                <span>Experience</span>
                                <span>1-3 Years</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceDetail;