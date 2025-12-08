import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function ServiceDetail({ user }) {
    const { id } = useParams(); // post id
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchJob = async () => {
            try {
                const res = await API.get(`/posts/${id}`);
                setJob(res.data);
            } catch (err) {
                console.error("Failed to load post", err);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const getAvatarColor = (name) => {
        const colors = ["#FFB6C1", "#87CEFA", "#90EE90", "#FFA07A", "#BA55D3"];
        return colors[(name || "A").charCodeAt(0) % colors.length];
    };

    const handleApply = async () => {
        if (!job) return;
        if (!user) {
            navigate("/login");
            return;
        }
        if (user.role !== "PROVIDER") {
            alert("Only caregivers (providers) can apply to this job.");
            return;
        }

        try {
            await API.post("/bookings", {
                postId: job.id,
                postTitle: job.title,
                clientId: job.clientId || 1,
                clientName: job.clientName || "Client",
                providerId: user.id,
                providerName: user.fullName,
                status: "PENDING",
            });

            alert("Success! Job accepted. Check 'My Activities'.");
            navigate("/my-activities");
        } catch (error) {
            console.error(error);
            alert("Failed to accept job. Please try again.");
        }
    };

    const handleChat = () => {
        if (!user) {
            navigate("/login");
            return;
        }
        alert(
            "Chat feature is coming soon!\nYou can manage this job in 'My Activities'."
        );
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <p>Loading job detail...</p>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="container mt-5">
                <h4>Job not found.</h4>
                <button className="btn btn-link" onClick={() => navigate('/marketplace')}>Back to Jobs</button>
            </div>
        );
    }

    return (
        <div
            style={{
                backgroundColor: "#f0f2f5",
                minHeight: "calc(100vh - 60px)",
                padding: "30px 0",
            }}
        >
            <div className="container" style={{ maxWidth: "900px" }}>
                <div className="boss-card p-4 mb-3">
                    <button
                        className="btn btn-link p-0 mb-3"
                        onClick={() => navigate(-1)}
                    >
                        <i className="bi bi-arrow-left"></i> Back
                    </button>

                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h2
                                style={{ fontSize: "24px", fontWeight: "800", marginBottom: 8 }}
                            >
                                {job.title}
                            </h2>
                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                <span className="boss-badge">
                                    {job.location || "Location not specified"}
                                </span>
                                <span className="boss-badge" style={{ color: '#ff4d4f', background: '#fff1f0', border: '1px solid #ffa39e' }}>
                                    {job.price || "Negotiable"}
                                </span>
                            </div>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "12px", color: "#999" }}>Posted on</div>
                            <div style={{ fontSize: "14px", fontWeight: "600" }}>
                                {job.createdAt ? job.createdAt.substring(0, 10) : "Recent"}
                            </div>
                        </div>
                    </div>

                    <div className="boss-recruiter-card-large mb-3">
                        <div
                            className="boss-avatar-small"
                            style={{
                                width: '50px', height: '50px', fontSize: '20px',
                                background: getAvatarColor(job.clientName),
                                marginRight: '15px'
                            }}
                        >
                            {job.clientName ? job.clientName.charAt(0) : "C"}
                        </div>
                        <div>
                            <div
                                style={{
                                    fontSize: "12px",
                                    color: "#999",
                                    marginBottom: "4px",
                                }}
                            >
                                Client (Hiring)
                            </div>
                            <div
                                style={{
                                    fontWeight: "600",
                                    color: "#333",
                                    marginBottom: "2px",
                                }}
                            >
                                {job.clientName || "Client User"}
                            </div>
                        </div>

                        <div className="ms-auto d-flex gap-2">
                            <button
                                className="btn-boss-outline btn-sm"
                                onClick={handleChat}
                            >
                                Chat
                            </button>
                            {user && user.id !== job.clientId && (
                                <button
                                    className="btn-boss btn-sm"
                                    onClick={handleApply}
                                >
                                    Accept Job
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="boss-detail-section" style={{ marginTop: '30px' }}>
                        <h5 style={{ fontWeight: 'bold', borderLeft: '4px solid #00bebd', paddingLeft: '10px' }}>Description</h5>
                        <p style={{ lineHeight: '1.6', color: '#555', marginTop: '15px' }}>{job.description || "No description provided."}</p>
                    </div>

                    <div className="boss-detail-section" style={{ marginTop: '30px' }}>
                        <h5 style={{ fontWeight: 'bold', borderLeft: '4px solid #00bebd', paddingLeft: '10px' }}>Responsibilities</h5>
                        <ul style={{ marginTop: '15px', color: '#555', paddingLeft: '20px' }}>
                            <li>Provide basic daily assistance and companionship.</li>
                            <li>Follow the client's routine and preferences.</li>
                            <li>Ensure safety and report any issues in time.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceDetail;