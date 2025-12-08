import React, { useEffect, useState, useMemo } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function MyActivities({ user }) {
    const [activeTab, setActiveTab] = useState("active");
    const [activities, setActivities] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);

    useEffect(() => {
        if (!user) return;
        const endpoint = user.role === "PROVIDER"
            ? `/bookings/provider/${user.id}`
            : `/bookings/client/${user.id}`;

        API.get(endpoint)
            .then((res) => {
                const data = res.data || [];
                const uniqueData = Array.from(new Map(data.map(item => [item.postId + item.status, item])).values());
                setActivities(uniqueData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            })
            .catch((err) => console.error("Failed to load bookings", err));
    }, [user]);

    const filteredActivities = useMemo(() => {
        return activities.filter((item) => {
            if (activeTab === "active") {
                return ["PENDING", "ACTIVE"].includes(item.status);
            } else {
                return ["COMPLETED", "CANCELLED", "INTERESTED"].includes(item.status);
            }
        });
    }, [activeTab, activities]);

    useEffect(() => {
        if (filteredActivities.length > 0) {
            const stillExists = filteredActivities.find(a => a.id === selectedItem?.id);
            if (!stillExists) {
                setSelectedItem(filteredActivities[0]);
            }
        } else {
            setSelectedItem(null);
        }
    }, [filteredActivities, selectedItem]);

    const getStatusStyle = (status) => {
        switch (status) {
            case "INTERESTED": return { bg: "#f0f0f0", color: "#666" }; // 灰色，表示“已浏览”
            case "PENDING": return { bg: "#e6f7ff", color: "#1890ff" };
            case "ACTIVE": return { bg: "#e6fffb", color: "#00bebd" };
            case "COMPLETED": return { bg: "#f5f5f5", color: "#999" };
            case "CANCELLED": return { bg: "#fff1f0", color: "#ff4d4f" };
            default: return { bg: "#fff", color: "#333" };
        }
    };

    const getAvatarColor = (name) => {
        const colors = ["#FFB6C1", "#87CEFA", "#90EE90", "#FFA07A", "#BA55D3"];
        return colors[(name || "A").charCodeAt(0) % colors.length];
    };

    const handleComplete = async (item) => {
        if (!window.confirm("Confirm job completion?")) return;
        try {
            await API.put(`/bookings/${item.id}`, { status: "COMPLETED" });
            setActivities(prev => prev.map(a => a.id === item.id ? { ...a, status: "COMPLETED" } : a));
            if (activeTab === "active") setSelectedItem(null);
        } catch (err) { alert("Operation failed"); }
    };

    const handleCancel = async (item) => {
        if (!window.confirm("Cancel this booking?")) return;
        try {
            await API.put(`/bookings/${item.id}`, { status: "CANCELLED" });
            setActivities(prev => prev.map(a => a.id === item.id ? { ...a, status: "CANCELLED" } : a));
            if (activeTab === "active") setSelectedItem(null);
        } catch (err) { alert("Operation failed"); }
    };

    return (
        <div style={{ backgroundColor: "#f6f6f8", minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>
            <div className="boss-sub-header">
                <div className="container d-flex justify-content-between align-items-center">
                    <h3 style={{ fontWeight: "800", margin: 0 }}>My Activities</h3>
                    <div className="boss-login-tabs" style={{ width: "240px", background: "white", border: "1px solid #eee", marginBottom: 0 }}>
                        <div className={`boss-tab-item ${activeTab === "active" ? "active" : ""}`} onClick={() => setActiveTab("active")}>In Progress</div>
                        <div className={`boss-tab-item ${activeTab === "past" ? "active" : ""}`} onClick={() => setActiveTab("past")}>History</div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ flex: 1, paddingBottom: 20 }}>
                <div className="boss-workbench-container">
                    {/* Left List */}
                    <div className="boss-job-list-container" style={{ width: '400px' }}>
                        {filteredActivities.length > 0 ? (
                            filteredActivities.map((item) => {
                                const style = getStatusStyle(item.status);
                                const displayStatus = item.status === "INTERESTED" ? "VIEWED" : item.status;

                                return (
                                    <div
                                        key={item.id}
                                        className={`boss-job-card-item ${selectedItem && selectedItem.id === item.id ? "active" : ""}`}
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        <div className="d-flex justify-content-between mb-2">
                                            <span style={{ fontWeight: "bold", fontSize: "15px" }}>{item.postTitle || "Care Request"}</span>
                                            <span style={{ fontSize: "12px", background: style.bg, color: style.color, padding: "2px 8px", borderRadius: "4px" }}>
                                                {displayStatus}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: "13px", color: "#666", display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div className="boss-avatar-small" style={{ width: 24, height: 24, fontSize: 12, background: getAvatarColor(user.role === 'PROVIDER' ? item.clientName : item.providerName) }}>
                                                {(user.role === 'PROVIDER' ? item.clientName : item.providerName)?.charAt(0)}
                                            </div>
                                            {user.role === "PROVIDER" ? item.clientName : item.providerName}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center p-5 text-secondary">
                                {activeTab === 'active' ? 'No active jobs.' : 'No history found.'}
                            </div>
                        )}
                    </div>

                    <div className="boss-job-detail-container">
                        {selectedItem ? (
                            <>
                                <div className="boss-detail-header-wrapper">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h2 className="boss-detail-title" style={{ fontSize: '24px' }}>{selectedItem.postTitle}</h2>
                                            <div className="boss-detail-meta" style={{ marginTop: '10px' }}>
                                                <span className="boss-tag" style={{ background: getStatusStyle(selectedItem.status).bg, color: getStatusStyle(selectedItem.status).color }}>
                                                    {selectedItem.status === "INTERESTED" ? "BROWSING HISTORY" : selectedItem.status}
                                                </span>
                                                <span style={{ color: '#999', fontSize: '13px' }}>Ref #{selectedItem.id}</span>
                                            </div>
                                        </div>

                                        <div className="d-flex gap-2">
                                            {selectedItem.status === "ACTIVE" && (
                                                <button className="btn-boss" onClick={() => handleComplete(selectedItem)}>Mark Complete</button>
                                            )}
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => navigate(`/chat/${selectedItem.id}`)}
                                            >
                                                Open Chat
                                            </button>

                                            {["PENDING", "ACTIVE"].includes(selectedItem.status) && user.role === "CLIENT" && (
                                                <button className="btn btn-outline-danger" onClick={() => handleCancel(selectedItem)}>
                                                    Cancel Request
                                                </button>
                                            )}

                                            {selectedItem.status === "INTERESTED" && (
                                                <button className="btn-boss" onClick={() => navigate(`/post/${selectedItem.postId}`)}>
                                                    View Job Again
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="boss-detail-body-wrapper">
                                    <div className="boss-recruiter-card-large">
                                        <div className="boss-avatar-large" style={{ background: getAvatarColor(user.role === 'PROVIDER' ? selectedItem.clientName : selectedItem.providerName) }}>
                                            {(user.role === 'PROVIDER' ? selectedItem.clientName : selectedItem.providerName)?.charAt(0)}
                                        </div>
                                        <div className="boss-recruiter-text">
                                            <h4>{user.role === 'PROVIDER' ? selectedItem.clientName : selectedItem.providerName}</h4>
                                            <p>{user.role === 'PROVIDER' ? "Client" : "User"}</p>
                                        </div>
                                    </div>

                                    <div className="boss-description-text" style={{ marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                                        <h5 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Record Info</h5>
                                        <ul style={{ listStyle: 'none', padding: 0, color: '#666', fontSize: '14px', lineHeight: '2' }}>
                                            <li><i className="bi bi-clock me-2"></i> Time: {new Date(selectedItem.createdAt).toLocaleString()}</li>
                                            {selectedItem.status === 'INTERESTED' && <li><i className="bi bi-eye me-2"></i> Type: Page View / Browsing Record</li>}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="d-flex align-items-center justify-content-center h-100 text-secondary">
                                <div className="text-center">
                                    <i className="bi bi-hand-index-thumb" style={{ fontSize: '40px', color: '#eee' }}></i>
                                    <p className="mt-3">Select an activity to view details</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyActivities;