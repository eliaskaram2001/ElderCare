import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function CreatePost({ user }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("New York City");
    const [price, setPrice] = useState("$25/hr");
    const [tags, setTags] = useState([]);

    const navigate = useNavigate();

    // NEW YORK LOCATION LIST
    const NY_LOCATIONS = [
        "New York City",
        "Buffalo",
        "Rochester",
        "Yonkers",
        "Syracuse",
        "Albany",
        "New Rochelle",
        "Mount Vernon",
        "Schenectady",
        "Utica"
    ];

    // HOURLY RATE OPTIONS
    const PRICE_OPTIONS = [
        "$15/hr",
        "$20/hr",
        "$25/hr",
        "$30/hr",
        "$35/hr",
        "$40/hr"
    ];

    // Tag options
    const TAG_OPTIONS = [
        { id: "HOME", label: "Home Care" },
        { id: "MEDICAL", label: "Medical" },
        { id: "ERRANDS", label: "Errands" },
        { id: "COMPANIONSHIP", label: "Companionship" }
    ];

    const toggleTag = (tagId) => {
        setTags(prev =>
            prev.includes(tagId)
                ? prev.filter(t => t !== tagId)
                : [...prev, tagId]
        );
    };

    const submit = async () => {
        if (!title || !description || !location) {
            return alert("All fields are required");
        }

        try {
            await API.post("/posts", {
                clientId: user.id,
                title,
                description,
                location,
                price,
                tags: tags.join(",")
            });

            alert("Success! Your care request has been posted.");
            navigate("/marketplace");
        } catch (error) {
            alert("Failed to create post.");
        }
    };

    if (!user || user.role !== "CLIENT") {
        return (
            <div className="container mt-5" style={{ display: 'flex', justifyContent: 'center', paddingTop: '100px' }}>
                <div className="boss-card p-5 text-center" style={{ width: '500px' }}>
                    <h3>Access Denied</h3>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: '#f6f6f8', minHeight: 'calc(100vh - 60px)', padding: '40px 0' }}>
            <div className="container" style={{ maxWidth: '1000px', display: 'flex', gap: '20px' }}>

                <div style={{ flex: 1 }}>
                    <div className="boss-card">

                        <h3 style={{ fontWeight: '800' }}>Post a New Job</h3>

                        {/* TITLE */}
                        <div className="mb-4">
                            <label className="boss-label">Job Title</label>
                            <input
                                className="boss-input"
                                placeholder="e.g. Elderly Care Assistant needed"
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                        </div>

                        {/* LOCATION + PRICE */}
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>

                            {/* NEW YORK DROPDOWN */}
                            <div style={{ flex: 1 }}>
                                <label className="boss-label">Location</label>
                                <select
                                    className="boss-input"
                                    value={location}
                                    onChange={(e)=>setLocation(e.target.value)}
                                >
                                    {NY_LOCATIONS.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>

                            {/* PRICE DROPDOWN */}
                            <div style={{ flex: 1 }}>
                                <label className="boss-label">Hourly Rate</label>
                                <select
                                    className="boss-input"
                                    value={price}
                                    onChange={(e)=>setPrice(e.target.value)}
                                >
                                    {PRICE_OPTIONS.map(rate => (
                                        <option key={rate} value={rate}>{rate}</option>
                                    ))}
                                </select>
                            </div>

                        </div>

                        {/* TAG SELECTOR */}
                        <div className="mb-4">
                            <label className="boss-label">Job Category</label>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                {TAG_OPTIONS.map(tag => (
                                    <button
                                        key={tag.id}
                                        onClick={() => toggleTag(tag.id)}
                                        className={`boss-tag-button ${tags.includes(tag.id) ? "active" : ""}`}
                                        style={{
                                            padding: "6px 14px",
                                            borderRadius: "20px",
                                            border: tags.includes(tag.id) ? "1px solid #00bebd" : "1px solid #ccc",
                                            background: tags.includes(tag.id) ? "#e0f7f7" : "#fafafa",
                                            color: tags.includes(tag.id) ? "#00bebd" : "#555",
                                            cursor: "pointer"
                                        }}
                                    >
                                        {tag.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="mb-4">
                            <label className="boss-label">Job Description</label>
                            <textarea
                                className="boss-input"
                                rows="8"
                                placeholder="Describe daily tasks and needs..."
                                onChange={(e)=>setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <button className="btn-boss-outline" onClick={() => navigate('/marketplace')}>
                                Cancel
                            </button>
                            <button className="btn-boss" onClick={submit} style={{ marginLeft: '15px' }}>
                                Publish Now
                            </button>
                        </div>

                    </div>
                </div>

                {/* SIDEBAR UNCHANGED */}
                <div style={{ width: '320px' }}>
                    <div className="boss-card text-center">
                        <h4>Tips</h4>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CreatePost;
