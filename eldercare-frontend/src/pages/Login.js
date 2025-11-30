import React, { useState } from "react";
import API from "../api/api";
import {Link, useNavigate} from "react-router-dom";

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await API.post("/auth/login", {
                email,
                password,
            });
            setUser(response.data);
            navigate("/Profile")
        } catch (err) {
            alert("Invalid login");
        }
    };

    return (
        <div className="d-flex justify-content-start align-items-center vh-100 flex-column p-5">
            <br/>
            <h1 className={"mb-3"}>Login</h1>
            <div className="d-flex flex-column">
                <input
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={"mb-3"}
                />

                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className={"mb-4"}
                />
                <button
                    type={"submit"}
                    onClick={handleLogin}
                    className={"btn btn-primary"}
                >
                    Login
                </button>
                <p>Need to Register? <Link to={"/Register"}>Sign up here</Link></p>
            </div>
        </div>
    );
}

export default Login;
