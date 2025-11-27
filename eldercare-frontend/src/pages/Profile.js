import React, { useState } from "react";
import API from "../api/api";

function Profile({ user }) {
    const [form, setForm] = useState({
        fullName: user.fullName,
        location: user.location,
        bio: user.bio,
        phone: user.phone
    });

    const update = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const save = async () => {
        const response = await API.put(`/users/${user.id}`, form);
        alert("Profile updated!");
    };

    if (!user) return <h3>You are not logged in</h3>;

    return (
        <div style={{ padding: 20 }}>
            <h2>Edit Profile</h2>
            <input name="fullName" value={form.fullName} onChange={update} /> <br/><br/>
            <input name="location" value={form.location} onChange={update} /> <br/><br/>
            <textarea name="bio" value={form.bio} onChange={update}></textarea> <br/><br/>
            <input name="phone" value={form.phone} onChange={update} /> <br/><br/>
            <button onClick={save}>Save</button>
        </div>
    );
}

export default Profile;
