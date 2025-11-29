import React, { useEffect, useState } from "react";
import API from "../api/api";
import {Link} from "react-router-dom";

function Marketplace() {
    const [providers, setProviders] = useState([]);
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState("providers");

    useEffect(() => {
        API.get("/users/providers").then(res => setProviders(res.data));
        API.get("/posts").then(res => setPosts(res.data));
    }, []);

    return (
        <>
            {/*code that creates the profile button*/}
            <div className={"d-flex justify-content-start align-items-start m-2 ms-3"}>
                <Link to={"/Profile"}>Profile</Link>
            </div>
            <div className={"d-flex justify-content-start align-items-center vh-100 flex-column p-5"}>
                <h1 className={"mb-4"}>Marketplace</h1>

                {/*code that creates the tab system*/}
                <nav>
                    <ul className={"nav nav-tabs mb-3"}>
                        <li className={"nav-item"}>
                            <button
                                className={`nav-link ${activeTab === "providers" ? "active" : ""}`}
                                onClick={() => setActiveTab("providers")}
                                type={"button"}
                            >
                                Providers
                            </button>
                        </li>

                        <li className={"nav-item"}>
                            <button
                                className={`nav-link ${activeTab === "posts" ? "active" : ""}`}
                                onClick={() => setActiveTab("posts")}
                                type={"button"}
                            >
                                Care Posts
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* Tab Content */}
                <div className={"justify-content-start align-items-center flex-column mt-3"}>
                    {activeTab === "providers" && (
                        <div>
                            <p>Dummy text to make sure it works</p>
                            {providers.map(p => (
                                <div
                                    key={p.id}
                                    className={"border rounded p-3 mb-3"}
                                >
                                    <strong>{p.fullName}</strong><br />
                                    {p.location}<br />
                                    {p.bio}
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "posts" && (
                        <div>
                            <p>this text really funky</p>
                            {posts.map(post => (
                                <div
                                    key={post.id}
                                    className={"border rounded p-3 mb-3"}
                                >
                                    <strong>{post.title}</strong><br />
                                    {post.description}<br />
                                    Location: {post.location}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Marketplace;
