import React, { useState } from "react";
import API from "../api/api";
import {Link, useNavigate} from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "CLIENT",
        location: "",
        bio: "",
        phone: "",
    });

    const navigate = useNavigate();

    const update = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            await API.post("/auth/register", form);
            navigate("/Profile")
        } catch (err) {
            alert("Error in registration process");
        }
    };

    return (
        <div className="d-flex justify-content-start align-items-center vh-100 flex-column p-5">
            <h1 className={"mb-3"}>Create Account</h1>
            <div className="d-flex flex-column">
                <input
                    name="fullName"
                    placeholder="Full Name"
                    onChange={update}
                    className={"mb-4"}
                />
                <input
                    name="email"
                    placeholder="Email"
                    onChange={update}
                    className={"mb-4"}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={update}
                    className={"mb-4"}
                />
                <select name="role" onChange={update} className={"mb-4"}>
                    <option value="CLIENT">Client</option>
                    <option value="PROVIDER">Provider</option>
                </select>
                <input
                    name="location"
                    placeholder="Location"
                    onChange={update}
                    className={"mb-4"}
                />
                <input
                    name="phone"
                    placeholder="Phone"
                    onChange={update}
                    className={"mb-3"}
                />
                <textarea
                    name="bio"
                    placeholder="Short bio"
                    onChange={update}
                    className={"mb-4"}
                />

                <button
                    type={"submit"}
                    onClick={handleRegister}
                    className={"btn btn-primary"}
                >Register
                </button>
                <p>Already have an account? <Link to={"/Login"}>Login in here</Link></p>
            </div>
        </div>
    );
}

export default Register;
