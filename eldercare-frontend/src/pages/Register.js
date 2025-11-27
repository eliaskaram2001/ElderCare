import React, { useState } from "react";
import API from "../api/api";

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

    const update = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const register = async () => {
        try {
            await API.post("/auth/register", form);
            alert("Account created!");
        } catch (err) {
            alert("Email already in use");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Create Account</h2>

            <input name="fullName" placeholder="Full Name" onChange={update} /> <br /><br/>
            <input name="email" placeholder="Email" onChange={update} /> <br /><br/>
            <input type="password" name="password" placeholder="Password" onChange={update} /> <br /><br/>

            <select name="role" onChange={update}>
                <option value="CLIENT">Client</option>
                <option value="PROVIDER">Provider</option>
            </select>
            <br /><br/>

            <input name="location" placeholder="Location" onChange={update} /> <br /><br/>
            <input name="phone" placeholder="Phone" onChange={update} /> <br /><br/>
            <textarea name="bio" placeholder="Short bio" onChange={update}></textarea> <br /><br/>

            <button onClick={register}>Register</button>
        </div>
    );
}

export default Register;
