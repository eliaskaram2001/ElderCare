import React, { useEffect, useState } from "react";
import API from "../api/api";

function Marketplace() {
    const [providers, setProviders] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        API.get("/users/providers").then(res => setProviders(res.data));
        API.get("/posts").then(res => setPosts(res.data));
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Providers</h2>
            {providers.map(p => (
                <div key={p.id} style={{border: "1px solid #ccc", margin: 10, padding: 10}}>
                    <strong>{p.fullName}</strong><br/>
                    {p.location}<br/>
                    {p.bio}
                </div>
            ))}

            <h2>Care Posts</h2>
            {posts.map(post => (
                <div key={post.id} style={{border: "1px solid #ccc", margin: 10, padding: 10}}>
                    <strong>{post.title}</strong><br/>
                    {post.description}<br/>
                    Location: {post.location}
                </div>
            ))}
        </div>
    );
}

export default Marketplace;
