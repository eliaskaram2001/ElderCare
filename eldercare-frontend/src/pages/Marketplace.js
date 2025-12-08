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

    useEffect(() => {
        let result = [...posts];

        if (searchTerm.trim()) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(
                (job) =>
                    job.title?.toLowerCase().includes(lower) ||
                    job.description?.toLowerCase().includes(lower)
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

    const handleInterested = async () => {
        if (!selectedJob) return;
        if (!user) { navigate("/login"); return; }

        try {
            await API.post("/bookings", {
                postId: selectedJob.id,
                postTitle: selectedJob.title,
                clientId: selectedJob.clientId || 1,
                clientName: selectedJob.clientName || "Client User",
                providerId: user.id,
                providerName: user.fullName,
                status: "INTERESTED",
            });
            alert("Added to Browsing History!");
        } catch (err) {
            console.error(err);
        }
    };

    const handleChatApply = async () => {
        if (!selectedJob) return;

        if (user) {
            try {
                await API.post("/bookings", {
                    postId: selectedJob.id,
                    postTitle: selectedJob.title,
                    clientId: selectedJob.clientId || 1,
                    clientName: selectedJob.clientName || "Client",
                    providerId: user.id,
                    providerName: user.fullName,
                    status: "INTERESTED",
                });
            } catch (error) {
                console.log("History record already exists or failed");
            }
        }

        navigate(`/post/${selectedJob.id}`);
    };

    return (
        <div style={{ backgroundColor: "#f6f6f8", minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>
            <div className="boss-sub-header">
                <div className="container">
                    <div className="boss-search-wrapper">
                        <div className="boss-search-main">
                            <input
                                className="boss-search-input"
                                placeholder="Search by title / description"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
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

            <div className="container" style={{ flex: 1, paddingBottom: 20 }}>
                <div className="boss-workbench-container">
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
                                        <div className="boss-card-salary" style={{color: '#00bebd'}}>{job.price || "Negotiable"}</div>
                                    </div>
                                    <div className="boss-card-mid">
                                        <span className="boss-card-tag">{job.location?.split(",")[0] || "Albany"}</span>
                                        <span className="boss-card-tag">Verified</span>
                                    </div>
                                    <div className="boss-card-bot">
                                        <div className="boss-recruiter-info">
                                            <div className="boss-avatar-small" style={{ background: getAvatarColor(job.clientName) }}></div>
                                            <span>{job.clientName || "Hiring Manager"}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center p-5 text-secondary">No jobs found.</div>
                        )}
                    </div>

                    <div className="boss-job-detail-container">
                        {selectedJob ? (
                            <>
                                <div className="boss-detail-header-wrapper">
                                    <div>
                                        <h2 className="boss-detail-title">{selectedJob.title}</h2>
                                        <div className="boss-detail-meta">
                                            <span>{selectedJob.location || "Albany, NY"}</span>
                                            <span>{selectedJob.createdAt ? selectedJob.createdAt.substring(0, 10) : ""}</span>
                                        </div>
                                    </div>
                                    <div className="boss-action-btns">
                                        <button className="btn-boss-outline-large" onClick={handleInterested}>
                                            Interested
                                        </button>
                                        <button className="btn-boss-primary-large" onClick={handleChatApply}>
                                            Chat / Apply
                                        </button>
                                    </div>
                                </div>

                                <div className="boss-detail-body-wrapper">
                                    <div className="boss-recruiter-card-large">
                                        <div className="boss-avatar-large" style={{ background: getAvatarColor(selectedJob.clientName) }}>
                                            {(selectedJob.clientName || "C").charAt(0)}
                                        </div>
                                        <div className="boss-recruiter-text">
                                            <h4>{selectedJob.clientName || "Hiring Manager"} <span className="boss-tag ms-2">Active</span></h4>
                                            <p>ElderCare Family Client • Verified User</p>
                                        </div>
                                        <button className="btn-boss-outline ms-auto" onClick={() => navigate("/profile")}>View Profile</button>
                                    </div>

                                    <h3 className="boss-section-title">Job Description</h3>
                                    <div className="boss-description-text">
                                        {selectedJob.description || "No description provided."}
                                    </div>

                                    <h3 className="boss-section-title mt-4">Requirements</h3>
                                    <ul className="boss-requirements-list">
                                        <li>Good communication and patience.</li>
                                        <li>Experience with elderly care is preferred.</li>
                                        <li>Basic safety knowledge and responsibility.</li>
                                    </ul>
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