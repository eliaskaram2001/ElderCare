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

    const navigate = useNavigate();

    // 1. Load Data from API
    useEffect(() => {
        API.get("/posts").then(res => {
            setPosts(res.data);
            setFilteredPosts(res.data);
            if (res.data.length > 0) setSelectedJob(res.data[0]);
        }).catch(err => console.error(err));
    }, []);

    // 2. Search Logic
    useEffect(() => {
        if (!searchTerm) {
            setFilteredPosts(posts);
        } else {
            const lowerQ = searchTerm.toLowerCase();
            const results = posts.filter(p =>
                p.title?.toLowerCase().includes(lowerQ) ||
                p.location?.toLowerCase().includes(lowerQ) ||
                p.description?.toLowerCase().includes(lowerQ)
            );
            setFilteredPosts(results);
            if (results.length > 0) setSelectedJob(results[0]);
            else setSelectedJob(null);
        }
    }, [searchTerm, posts]);

    // 3. Handle Job Application
    const handleApply = async () => {
        if (!user) return navigate("/login");
        if (user.role !== 'PROVIDER') return alert("Access Denied: Only Caregivers (Providers) can accept jobs.");

        try {
            await API.post("/bookings", {
                postId: selectedJob.id,
                postTitle: selectedJob.title,
                clientId: selectedJob.clientId || 1,
                clientName: selectedJob.clientName || "Client User",
                providerId: user.id,
                providerName: user.fullName,
                status: "PENDING"
            });
            alert("Application Sent! Please check 'My Activities'.");
        } catch (error) {
            alert("Failed to apply. Please try again.");
        }
    };

    // Helper to generate consistent avatar colors
    const getAvatarColor = (name) => {
        const colors = ['#FFB6C1', '#87CEFA', '#90EE90', '#FFA07A', '#BA55D3'];
        return colors[(name || 'A').charCodeAt(0) % colors.length];
    };

    return (
        <div style={{ backgroundColor: '#f6f6f8', minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>

            <div className="boss-sub-header">
                <div className="container">
                    {/* Search Box */}
                    <div className="boss-main-search-box">
                        <div className="boss-search-type-select">
                            Job Type <i className="bi bi-caret-down-fill ms-2" style={{ fontSize: '12px', color: '#ccc' }}></i>
                        </div>
                        <input
                            className="boss-main-search-input"
                            placeholder="Search by job title, location, or skills..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="boss-main-search-btn">Search</button>
                    </div>

                    <div className="d-flex gap-4 boss-filter-row">
                        <div className="boss-filter-item">Location: {initialQuery || "All"} <i className="bi bi-caret-down-fill"></i></div>
                        <div className="boss-filter-item">Industry <i className="bi bi-caret-down-fill"></i></div>
                        <div className="boss-filter-item">Job Type <i className="bi bi-caret-down-fill"></i></div>
                        <div className="boss-filter-item">Salary <i className="bi bi-caret-down-fill"></i></div>
                        <div className="boss-filter-item">More <i className="bi bi-caret-down-fill"></i></div>
                        <div className="ms-auto text-secondary small" style={{ cursor:'pointer' }} onClick={() => setSearchTerm("")}>Clear Filters</div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ flex: 1, paddingBottom: '20px' }}>
                <div className="boss-workbench-container">

                    <div className="boss-job-list-container">
                        {filteredPosts.length > 0 ? filteredPosts.map(job => (
                            <div
                                key={job.id}
                                className={`boss-job-card-item ${selectedJob && selectedJob.id === job.id ? 'active' : ''}`}
                                onClick={() => setSelectedJob(job)}
                            >
                                <div className="boss-card-top">
                                    <div className="boss-card-title">{job.title}</div>
                                    <div className="boss-card-salary">{job.price || "$25/hr"}</div>
                                </div>
                                <div className="boss-card-mid">
                                    <span className="boss-card-tag">{job.location?.split(',')[0] || 'Albany'}</span>
                                    <span className="boss-card-tag">3-5 Yrs</span>
                                    <span className="boss-card-tag">Medical</span>
                                </div>
                                <div className="boss-card-bot">
                                    <div className="boss-recruiter-info">
                                        <div className="boss-avatar-tiny" style={{ background: getAvatarColor(job.clientName) }}></div>
                                        <span>{job.clientName || "Hiring Manager"}</span>
                                    </div>
                                    <div className="boss-company-info-right">ElderCare Verified</div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center p-5 text-secondary">No jobs found matching your criteria.</div>
                        )}
                    </div>

                    <div className="boss-job-detail-container">
                        {selectedJob ? (
                            <>
                                <div className="boss-detail-header-wrapper">
                                    <div className="boss-detail-title-row">
                                        <h1 className="boss-detail-title-large">{selectedJob.title}</h1>
                                        <div className="boss-detail-salary-large">{selectedJob.price || "$25/hr"}</div>
                                    </div>
                                    <div className="boss-detail-stat-row">
                                        <span><i className="bi bi-geo-alt-fill boss-stat-icon"></i> {selectedJob.location}</span>
                                        <span><i className="bi bi-briefcase-fill boss-stat-icon"></i> 3-5 Years Exp</span>
                                        <span><i className="bi bi-mortarboard-fill boss-stat-icon"></i> Certified</span>
                                    </div>
                                    <div className="boss-action-btns">
                                        <button className="btn-boss-outline-large">Interested</button>
                                        <button className="btn-boss-primary-large" onClick={handleApply}>Chat / Apply</button>
                                    </div>
                                </div>

                                <div className="boss-detail-body-wrapper">
                                    <div className="boss-recruiter-card-large">
                                        <div className="boss-avatar-large" style={{ background: getAvatarColor(selectedJob.clientName) }}>
                                            {(selectedJob.clientName || 'C').charAt(0)}
                                        </div>
                                        <div className="boss-recruiter-text">
                                            <h4>{selectedJob.clientName || "Hiring Manager"} <span className="boss-tag ms-2">Active</span></h4>
                                            <p>ElderCare Family Client • Verified User</p>
                                        </div>
                                        <button className="btn-boss-outline ms-auto">View Profile</button>
                                    </div>

                                    <h3 className="boss-section-title">Job Description</h3>
                                    <div className="boss-description-text">
                                        {selectedJob.description || "No detailed description provided."}
                                        <br/><br/>
                                        <strong>Responsibilities:</strong><br/>
                                        1. Provide daily care and companionship.<br/>
                                        2. Monitor health status and medication.<br/>
                                        3. Assist with light housekeeping if needed.<br/><br/>
                                        <strong>Requirements:</strong><br/>
                                        1. Valid CPR/First Aid certification.<br/>
                                        2. 1+ year of experience in elderly care.<br/>
                                        3. Patience, empathy, and reliability.
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