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

        const endpoint =
            user.role === "PROVIDER"
                ? `/bookings/provider/${user.id}`
                : `/bookings/client/${user.id}`;

        API.get(endpoint)
            .then((res) => {
                const data = res.data || [];
                setActivities(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
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
            const stillExists = filteredActivities.find((a) => a.id === selectedItem?.id);
            if (!stillExists) setSelectedItem(filteredActivities[0]);
        } else {
            setSelectedItem(null);
        }
    }, [filteredActivities, selectedItem]);

    const getStatusStyle = (status) => {
        switch (status) {
            case "INTERESTED": return { bg: "#f0f0f0", color: "#666" };
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

    const handleAccept = async (item) => {
        await API.put(`/bookings/${item.id}`, { status: "ACTIVE" });
        setActivities((prev) =>
            prev.map((a) => (a.id === item.id ? { ...a, status: "ACTIVE" } : a))
        );
    };

    const handleDecline = async (item) => {
        await API.put(`/bookings/${item.id}`, { status: "CANCELLED" });
        setActivities((prev) =>
            prev.map((a) => (a.id === item.id ? { ...a, status: "CANCELLED" } : a))
        );
    };

    const handleComplete = async (item) => {
        if (!window.confirm("Confirm job completion?")) return;
        await API.put(`/bookings/${item.id}`, { status: "COMPLETED" });
        setActivities((prev) =>
            prev.map((a) => (a.id === item.id ? { ...a, status: "COMPLETED" } : a))
        );
    };

    return (
        <div style={{ backgroundColor: "#f6f6f8", minHeight: "calc(100vh - 60px)", paddingBottom: 40 }}>
            {/* HEADER */}
            <div className="boss-sub-header">
                <div className="container d-flex justify-content-between align-items-center">
                    <h3 style={{ fontWeight: "800", margin: 0 }}>My Activities</h3>
                    <div className="boss-login-tabs" style={{ width: 240, background: "white" }}>
                        <div className={`boss-tab-item ${activeTab === "active" ? "active" : ""}`} onClick={() => setActiveTab("active")}>
                            In Progress
                        </div>
                        <div className={`boss-tab-item ${activeTab === "past" ? "active" : ""}`} onClick={() => setActiveTab("past")}>
                            History
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="boss-workbench-container">

                    {/* LEFT LIST */}
                    <div className="boss-job-list-container" style={{ width: 380 }}>
                        {filteredActivities.length > 0 ? (
                            filteredActivities.map((item) => {
                                const style = getStatusStyle(item.status);
                                return (
                                    <div
                                        key={item.id}
                                        className={`boss-job-card-item ${selectedItem?.id === item.id ? "active" : ""}`}
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        <div className="d-flex justify-content-between mb-2">
                                            <span style={{ fontWeight: "bold" }}>{item.postTitle}</span>
                                            <span style={{
                                                background: style.bg,
                                                color: style.color,
                                                padding: "2px 8px",
                                                borderRadius: 6,
                                                fontSize: 12
                                            }}>
                        {item.status}
                      </span>
                                        </div>

                                        <div className="d-flex align-items-center gap-2" style={{ fontSize: 13, color: "#666" }}>
                                            <div className="boss-avatar-small" style={{
                                                background: getAvatarColor(
                                                    user.role === "PROVIDER" ? item.clientName : item.providerName
                                                )
                                            }}>
                                                {(user.role === "PROVIDER" ? item.clientName : item.providerName)?.charAt(0)}
                                            </div>
                                            {user.role === "PROVIDER" ? item.clientName : item.providerName}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center p-5 text-secondary">
                                {activeTab === "active" ? "No active jobs." : "No history found."}
                            </div>
                        )}
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="boss-job-detail-container">
                        {selectedItem ? (
                            <>
                                <div className="boss-detail-header-wrapper">
                                    <div>
                                        <h2 className="boss-detail-title">{selectedItem.postTitle}</h2>
                                        <div className="boss-detail-meta mt-2">
                      <span className="boss-tag" style={{
                          background: getStatusStyle(selectedItem.status).bg,
                          color: getStatusStyle(selectedItem.status).color
                      }}>
                        {selectedItem.status}
                      </span>
                                            <span style={{ fontSize: 13, color: "#999" }}>Ref #{selectedItem.id}</span>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2">
                                        {/* CLIENT */}
                                        {user.role === "CLIENT" && selectedItem.status === "PENDING" && (
                                            <>
                                                <button className="btn btn-success" onClick={() => handleAccept(selectedItem)}>Accept</button>
                                                <button className="btn btn-outline-danger" onClick={() => handleDecline(selectedItem)}>Decline</button>
                                            </>
                                        )}

                                        {/* PROVIDER STATES */}
                                        {user.role === "PROVIDER" && selectedItem.status === "PENDING" && (
                                            <button className="btn btn-secondary" disabled>Pending ⏳</button>
                                        )}
                                        {user.role === "PROVIDER" && selectedItem.status === "ACTIVE" && (
                                            <button className="btn btn-success" disabled>Accepted ✅</button>
                                        )}
                                        {user.role === "PROVIDER" && selectedItem.status === "CANCELLED" && (
                                            <button className="btn btn-danger" disabled>Declined ❌</button>
                                        )}

                                        {/* COMPLETE */}
                                        {selectedItem.status === "ACTIVE" && user.role === "CLIENT" && (
                                            <button className="btn btn-primary" onClick={() => handleComplete(selectedItem)}>
                                                Mark Complete
                                            </button>
                                        )}

                                        {/* CHAT */}
                                        {selectedItem.status === "ACTIVE" && (
                                            <button className="btn btn-outline-primary" onClick={() => navigate(`/chat/${selectedItem.id}`)}>
                                                Open Chat
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="boss-detail-body-wrapper">
                                    <div className="boss-recruiter-card-large">
                                        <div className="boss-avatar-large" style={{
                                            background: getAvatarColor(
                                                user.role === "PROVIDER" ? selectedItem.clientName : selectedItem.providerName
                                            )
                                        }}>
                                            {(user.role === "PROVIDER" ? selectedItem.clientName : selectedItem.providerName)?.charAt(0)}
                                        </div>

                                        <div className="boss-recruiter-text">
                                            <h4>{user.role === "PROVIDER" ? selectedItem.clientName : selectedItem.providerName}</h4>
                                            <p>{user.role === "PROVIDER" ? "Client" : "Caregiver"}</p>
                                        </div>
                                    </div>

                                    <div className="boss-description-text mt-4">
                                        <h5 style={{ fontWeight: "bold" }}>Record Info</h5>
                                        <ul style={{ listStyle: "none", padding: 0, fontSize: 14, color: "#666" }}>
                                            <li>⏱ {new Date(selectedItem.createdAt).toLocaleString()}</li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="d-flex align-items-center justify-content-center h-100 text-secondary">
                                Select an activity to view details
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MyActivities;
