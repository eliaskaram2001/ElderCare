import React, { useState } from "react";
import API from "../api/api";

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const response = await API.post("/auth/login", {
                email,
                password,
            });
            setUser(response.data);
            alert("Logged in!");
        } catch (err) {
            alert("Invalid login");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Login</h2>
            <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <br /><br/>
            <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br/>
            <button onClick={login}>Login</button>
        </div>
    );
}

export default Login;
