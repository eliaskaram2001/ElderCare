import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useSearchParams, useNavigate } from "react-router-dom";

function Marketplace({ user }) {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [locationFilter, setLocationFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");

    const navigate = useNavigate();

    // LOAD ALL JOB POSTS
    useEffect(() => {
        API.get("/posts")
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : [];
                setPosts(data);
                setFilteredPosts(data);
                if (data.length > 0) setSelectedJob(data[0]);
            })
            .catch((err) => console.error("Failed to load posts", err));
    }, []);

    // SEARCH / FILTER
    useEffect(() => {
        let result = [...posts];

        if (searchTerm.trim()) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(
                (job) =>
                    job.title?.toLowerCase().includes(lower) ||
                    job.description?.toLowerCase().includes(lower) ||
                    job.tags?.toLowerCase().includes(lower)
            );
        }

        if (locationFilter.trim()) {
            const lowerLoc = locationFilter.toLowerCase();
            result = result.filter((job) =>
                (job.location || "").toLowerCase().includes(lowerLoc)
            );
        }

        setFilteredPosts(result);

        if (result.length > 0) {
            const exist = result.some((j) => j.id === selectedJob?.id);
            if (!exist || !selectedJob) setSelectedJob(result[0]);
        } else {
            setSelectedJob(null);
        }
    }, [searchTerm, locationFilter, roleFilter, posts, selectedJob]);

    const getAvatarColor = (name) => {
        const colors = ["#FFB6C1", "#87CEFA", "#90EE90", "#FFA07A", "#BA55D3"];
        return colors[(name || "A").charCodeAt(0) % colors.length];
    };

    return (
        <div style={{ backgroundColor: "#f6f6f8", minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>

            {/* SEARCH HEADER */}
            <div className="boss-sub-header">
                <div className="container">
                    <div className="boss-search-wrapper">

                        {/* SEARCH INPUT (UI FIXED) */}
                        <div className="boss-search-main">
                            <input
                                className="boss-search-input"
                                style={{
                                    borderRadius: "12px",
                                    border: "1px solid #ddd",
                                    padding: "14px 20px",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                                    fontSize: "15px",
                                }}
                                placeholder="Search by title, description, or tags"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* FILTERS */}
                        <div className="boss-search-filters">
                            <input
                                className="boss-filter-input"
                                placeholder="Location"
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                            />
                            <select
                                className="boss-filter-select"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                            >
                                <option value="ALL">All Types</option>
                                <option value="HOME">Home Care</option>
                                <option value="MEDICAL">Medical</option>
                            </select>
                        </div>

                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="container" style={{ flex: 1, paddingBottom: 20 }}>
                <div className="boss-workbench-container">

                    {/* LEFT SIDEBAR – JOB LIST */}
                    <div className="boss-job-list-container">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((job) => (
                                <div
                                    key={job.id}
                                    className={`boss-job-card-item ${selectedJob && selectedJob.id === job.id ? "active" : ""}`}
                                    onClick={() => setSelectedJob(job)}
                                >
                                    <div className="boss-card-top">
                                        <div className="boss-card-title">{job.title}</div>

                                        {/* SHOW PRICE */}
                                        <div className="boss-card-salary" style={{ color: "#00bebd", fontWeight: 600 }}>
                                            {job.price || "—"}
                                        </div>
                                    </div>

                                    <div className="boss-card-mid">
                                        <span className="boss-card-tag">
                                            {job.location?.split(",")[0] || "Albany"}
                                        </span>

                                        {/* OPEN / CLOSED STATUS */}
                                        <span
                                            className="boss-card-tag"
                                            style={{
                                                background: job.active ? "#e6fffb" : "#fff1f0",
                                                color: job.active ? "#00bebd" : "#ff4d4f",
                                                border: `1px solid ${job.active ? "#00bebd" : "#ff4d4f"}`
                                            }}
                                        >
                                            {job.active ? "OPEN" : "CLOSED"}
                                        </span>
                                    </div>

                                    {/* POSTED BY */}
                                    <div className="boss-card-bot">
                                        <div className="boss-recruiter-info">
                                            <div
                                                className="boss-avatar-small"
                                                style={{ background: getAvatarColor(job.clientName) }}
                                            ></div>
                                            <span>{job.clientName}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center p-5 text-secondary">No jobs found.</div>
                        )}
                    </div>

                    {/* RIGHT PANEL – JOB DETAILS */}
                    <div className="boss-job-detail-container">
                        {selectedJob ? (
                            <>
                                <div className="boss-detail-header-wrapper">
                                    <div>
                                        <h2 className="boss-detail-title">{selectedJob.title}</h2>

                                        {/* POSTED BY */}
                                        <p style={{ fontSize: "14px", marginTop: "5px", color: "#666" }}>
                                            Posted by {selectedJob.clientName}
                                        </p>

                                        <div className="boss-detail-meta">
                                            <span>{selectedJob.location}</span>
                                            <span>{selectedJob.price}</span>
                                            <span>{selectedJob.createdAt?.substring(0, 10)}</span>
                                        </div>
                                    </div>

                                    <div className="boss-action-btns">

                                        {/* CANCEL JOB (CLIENT ONLY) */}
                                        {user && user.role === "CLIENT" && selectedJob.clientId === user.id && selectedJob.active && (
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={async () => {
                                                    if (!window.confirm("Cancel this job posting?")) return;

                                                    await API.put(`/posts/deactivate/${selectedJob.id}`);

                                                    setPosts(prev => prev.map(p => p.id === selectedJob.id ? { ...p, active: false } : p));
                                                    setFilteredPosts(prev => prev.map(p => p.id === selectedJob.id ? { ...p, active: false } : p));
                                                    setSelectedJob(prev => ({ ...prev, active: false }));
                                                }}
                                            >
                                                Cancel Job
                                            </button>
                                        )}

                                        {/* APPLY BUTTON */}
                                        {user && user.role === "PROVIDER" && selectedJob.clientId !== user.id && selectedJob.active && (
                                            <button
                                                className="btn-boss-primary-large"
                                                onClick={() => navigate(`/post/${selectedJob.id}`)}
                                            >
                                                Apply for Job
                                            </button>
                                        )}

                                        {!selectedJob.active && user?.role === "PROVIDER" && (
                                            <button className="btn btn-secondary" disabled>Job Closed</button>
                                        )}

                                    </div>
                                </div>

                                <div className="boss-detail-body-wrapper">
                                    <h3 className="boss-section-title">Job Description</h3>
                                    <div className="boss-description-text">
                                        {selectedJob.description || "No description provided."}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="d-flex align-items-center justify-content-center h-100 text-secondary">
                                <p>Select a job from the left to view details</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Marketplace;
