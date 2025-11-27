import React, { useState } from "react";
import API from "../api/api";

function CreatePost({ user }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    const submit = async () => {
        await API.post("/posts", {
            clientId: user.id,
            title,
            description,
            location
        });
        alert("Post created!");
    };

    if (!user || user.role !== "CLIENT") {
        return <h3>You must be logged in as a client.</h3>;
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Create Post</h2>
            <input placeholder="Title" onChange={(e)=>setTitle(e.target.value)} /> <br/><br/>
            <textarea placeholder="Description" onChange={(e)=>setDescription(e.target.value)}></textarea> <br/><br/>
            <input placeholder="Location" onChange={(e)=>setLocation(e.target.value)} /> <br/><br/>
            <button onClick={submit}>Submit</button>
        </div>
    );
}

export default CreatePost;
