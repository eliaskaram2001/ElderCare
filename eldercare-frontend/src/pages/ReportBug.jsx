import React, { useState } from "react";
import API from "../api/api";

function ReportBug({ user }) {
    const [name, setName] = useState(user ? user.firstName + " " + user.lastName : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            await API.post("/bug-report", {
                name,
                email,
                description
            });

            setStatus("Bug report submitted successfully!");
            setDescription("");
        } catch (err) {
            console.error(err);
            setStatus("Failed to submit. Try again.");
        }
    };

    return (
        <div className="form-container" style={{ padding: 20 }}>
            <h2>Report a Bug</h2>

            <form onSubmit={handleSubmit} className="bug-form">
                <label>Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    required
                ></textarea>

                <button type="submit">Submit</button>
            </form>

            <p>{status}</p>
        </div>
    );
}

export default ReportBug;
