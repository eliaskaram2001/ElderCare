import React, { useState } from "react";
import API from "../api/api";
import {Link, useNavigate} from "react-router-dom";

function Welcome() {

    const navigate = useNavigate();

    const handleLogin = async () => {
        navigate("/Login")
    };
    const handleSignUp = async () => {
        navigate("/Register")
    };


    return(
        <div className={"d-flex justify-content-start align-items-center vh-100 flex-column p-5"}>
            <h1>Welcome to ElderCare!</h1>
            <h3>We are a website designed to assist the elderly in finding the help they need for their day-to-day lives!</h3>
            <div className={"d-flex justify-content-center gap-3"}>
                <button
                    type={"button"}
                    onClick={handleLogin}
                    className={"btn btn-secondary"}
                >
                    Log In!
                </button>
                <button
                    type={"button"}
                    onClick={handleSignUp}
                    className={"btn btn-primary"}
                >
                    Sign Up!
                </button>
            </div>
        </div>
    )
}
export default Welcome;