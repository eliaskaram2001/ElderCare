import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function ServiceDetail({ user }) {
    const { id } = useParams();
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

    const handleApply = async () => {
        if (!job) return;
        if (!user) return navigate("/login");

        if (user.role !== "PROVIDER") {
            alert("Only caregivers (providers) can apply to this job.");
            return;
        }

        try {
            await API.post("/bookings", {
                postId: job.id,
                postTitle: job.title,
                clientId: job.clientId,
                clientName: job.clientName,
                providerId: user.id,
                providerName: user.fullName,
                status: "PENDING",
            });

            alert("Your application has been submitted!");
            navigate("/my-activities");
        } catch (error) {
            console.error(error);
            alert("Failed to apply to job.");
        }
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
                <button className="btn btn-link" onClick={() => navigate('/marketplace')}>
                    Back to Jobs
                </button>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: "#f0f2f5", minHeight: "calc(100vh - 60px)", padding: "30px 0" }}>
            <div className="container" style={{ maxWidth: "900px" }}>
                <div className="boss-card p-4 mb-3">

                    {/* BACK BUTTON */}
                    <button className="btn btn-link p-0 mb-3" onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left"></i> Back
                    </button>

                    {/* HEADER */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "800", marginBottom: 8 }}>
                                {job.title}
                            </h2>

                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                <span className="boss-badge">{job.location}</span>
                                <span
                                    className="boss-badge"
                                    style={{
                                        color: "#00bebd",
                                        background: "#e0fffc",
                                        border: "1px solid #00bebd"
                                    }}
                                >
                                    {job.price || "Rate not listed"}
                                </span>
                            </div>

                            {/* POSTED BY */}
                            <p style={{ marginTop: "10px", color: "#777", fontSize: "14px" }}>
                                Posted by {job.clientName}
                            </p>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "12px", color: "#999" }}>Posted on</div>
                            <div style={{ fontSize: "14px", fontWeight: "600" }}>
                                {job.createdAt ? job.createdAt.substring(0, 10) : "Recent"}
                            </div>
                        </div>
                    </div>

                    {/* APPLY BUTTON — NO CHAT, NO RECRUITER CARD */}
                    {user && user.role === "PROVIDER" && user.id !== job.clientId && (
                        <button
                            className="btn-boss w-100 mb-4"
                            onClick={handleApply}
                            style={{ padding: "12px", fontSize: "16px" }}
                        >
                            Apply for Job
                        </button>
                    )}

                    {/* DESCRIPTION */}
                    <div className="boss-detail-section" style={{ marginTop: "20px" }}>
                        <h5 style={{ fontWeight: "bold", borderLeft: "4px solid #00bebd", paddingLeft: "10px" }}>
                            Job Description
                        </h5>
                        <p style={{ lineHeight: "1.6", color: "#555", marginTop: "15px" }}>
                            {job.description}
                        </p>
                    </div>

                    {/* ❌ REMOVED REQUIREMENTS SECTION COMPLETELY */}

                </div>
            </div>
        </div>
    );
}

export default ServiceDetail;
