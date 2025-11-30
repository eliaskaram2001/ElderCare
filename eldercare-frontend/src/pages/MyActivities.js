import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function MyActivities({ user }) {
    const [activeTab, setActiveTab] = useState("active");
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (!user) return;

        const endpoint = user.role === 'PROVIDER'
            ? `/bookings/provider/${user.id}`
            : `/bookings/client/${user.id}`;

        API.get(endpoint)
            .then(res => setActivities(res.data))
            .catch(err => console.error("Failed to load bookings", err));
    }, [user]);

    if (!user) return <div className="p-5 text-center">Redirecting to login...</div>;

    const getStatusStyle = (status) => {
        switch(status) {
            case 'PENDING': return { bg: '#fff7e6', color: '#fa8c16', border: '#ffd591' }; // 橙色
            case 'ACTIVE': return { bg: '#e6fffb', color: '#00bebd', border: '#87e8de' }; // 青色
            case 'COMPLETED': return { bg: '#f5f5f5', color: '#999', border: '#d9d9d9' }; // 灰色
            default: return { bg: '#fff', color: '#333', border: '#eee' };
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };

    const filteredActivities = activities.filter(item => {
        if (activeTab === 'active') return item.status === 'PENDING' || item.status === 'ACTIVE';
        return item.status === 'COMPLETED' || item.status === 'CANCELLED';
    });

    return (
        <div style={{ backgroundColor: '#f6f6f8', minHeight: 'calc(100vh - 60px)', padding: '30px 0' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#333', margin: 0 }}>My Activities</h2>

                    <div className="boss-login-tabs" style={{ width: '300px', background: 'white', border: '1px solid #eee' }}>
                        <div
                            className={`boss-tab-item ${activeTab === 'active' ? 'active' : ''}`}
                            onClick={() => setActiveTab('active')}
                        >
                            In Progress
                        </div>
                        <div
                            className={`boss-tab-item ${activeTab === 'past' ? 'active' : ''}`}
                            onClick={() => setActiveTab('past')}
                        >
                            History
                        </div>
                    </div>
                </div>

                <div>
                    {filteredActivities.length > 0 ? filteredActivities.map(item => {
                        const style = getStatusStyle(item.status);
                        return (
                            <div key={item.id} className="boss-card p-4">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div style={{ flex: 1 }}>
                                        <div className="d-flex align-items-center mb-3">
                                            <span style={{
                                                fontSize: '12px', padding: '4px 10px', borderRadius: '4px',
                                                background: style.bg, color: style.color, border: `1px solid ${style.border}`, fontWeight: 'bold'
                                            }}>
                                                {item.status}
                                            </span>
                                            <span className="ms-3 text-secondary" style={{ fontSize: '13px' }}>
                                                Order ID: #{item.id} &bull; {formatDate(item.createdAt)}
                                            </span>
                                        </div>

                                        <h4 style={{ fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
                                            {item.postTitle || "Care Service Request"}
                                        </h4>

                                        <div className="d-flex align-items-center p-3" style={{ background: '#f9f9f9', borderRadius: '8px' }}>
                                            <div style={{
                                                width: '40px', height: '40px', borderRadius: '50%',
                                                background: user.role === 'PROVIDER' ? '#FFA07A' : '#87CEFA', // 不同角色不同颜色
                                                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: '15px'
                                            }}>
                                                <i className={`bi ${user.role === 'PROVIDER' ? 'bi-person-badge' : 'bi-person-heart'}`}></i>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '12px', color: '#999', marginBottom: '2px' }}>
                                                    {user.role === 'PROVIDER' ? 'Client (Customer)' : 'Caregiver (Provider)'}
                                                </div>
                                                <div style={{ fontWeight: '600', color: '#333' }}>
                                                    {user.role === 'PROVIDER' ? (item.clientName || "Unknown") : (item.providerName || "Waiting for acceptance...")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-column gap-2 ms-4" style={{ width: '140px' }}>
                                        <button className="btn-boss-outline" style={{ fontSize: '14px' }}>View Detail</button>
                                        {item.status === 'ACTIVE' && (
                                            <button className="btn-boss" style={{ fontSize: '14px' }}>Complete</button>
                                        )}
                                        {item.status === 'PENDING' && user.role === 'CLIENT' && (
                                            <button className="btn btn-outline-danger btn-sm" style={{borderRadius:'4px'}}>Cancel</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="boss-card text-center p-5">
                            <div style={{ fontSize: '40px', color: '#eee', marginBottom: '20px' }}>
                                <i className="bi bi-inbox"></i>
                            </div>
                            <h5 style={{ color: '#666' }}>No activities found</h5>
                            <p style={{ color: '#999', fontSize: '14px' }}>
                                Go to <a href="/marketplace" style={{ color: '#00bebd', fontWeight: 'bold' }}>Marketplace</a> to find new opportunities.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyActivities;