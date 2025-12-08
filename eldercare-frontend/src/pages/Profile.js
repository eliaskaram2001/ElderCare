import React, { useEffect, useState } from "react";
import API from "../api/api";

function Profile({ user, setUser }) {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        bio: "",
        role: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!user) return;

        const fetchProfile = async () => {
            try {
                const res = await API.get(`/users/${user.id}`);
                setForm(res.data);
            } catch (err) {
                console.error("Failed to load profile", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const update = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const saveProfile = async () => {
        setSaving(true);
        try {
            const res = await API.put(`/users/${user.id}`, form);

            setUser(res.data);
            localStorage.setItem("eldercare_user", JSON.stringify(res.data));

            alert("Profile updated successfully!");
        } catch (err) {
            alert("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="container mt-5">Loading your profile...</div>;

    return (
        <div className="container mt-4" style={{ maxWidth: 600 }}>
            <h2 className="mb-4">My Profile</h2>

            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                    className="form-control"
                    name="fullName"
                    value={form.fullName}
                    onChange={update}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    className="form-control"
                    name="email"
                    value={form.email}
                    disabled
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                    className="form-control"
                    name="phone"
                    value={form.phone}
                    onChange={update}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                    className="form-control"
                    name="location"
                    value={form.location}
                    onChange={update}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Bio</label>
                <textarea
                    className="form-control"
                    name="bio"
                    value={form.bio}
                    rows={3}
                    onChange={update}
                />
            </div>

            <button
                className="btn btn-primary w-100"
                onClick={saveProfile}
                disabled={saving}
            >
                {saving ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
}

export default Profile;
