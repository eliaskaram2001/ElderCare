import React, { useState } from "react";
import API from "../api/api";
import {Link, useNavigate} from "react-router-dom";

const mockUser = {
    id: 1,
    fullName: "Jane Doe",
    email: "jane@example.com",
    location: "New York",
    bio: "Care provider with 5 years experience",
    phone: "555-123-4567"
};


function Profile({ user = mockUser }) {

    const [isEditing, setIsEditing] = useState(false)

    const navigate = useNavigate();

    const handleLogOut = (e) => {
        navigate("/Login")
    };

    if (!user) return <h3>You are not logged in</h3>;

    return (
        <>{/*code that creates the marketplace button*/}
            <div className={"d-flex justify-content-start align-items-start m-2 ms-3"}>
                <Link to={"/Marketplace"}>Marketplace</Link>
            </div>

            {/* code that will create the view profile features*/}
            <div className="d-flex justify-content-start align-items-center vh-100 flex-column p-5">
                <h1>Profile</h1>

                {!isEditing && (
                <>
                    <p className={"mb-1"}><strong>Name:</strong> {user.fullName}</p>
                    <h6 className={"mb-1"}><strong>Email:</strong> {user.email}</h6>
                    <h6 className={"mb-1"}><strong>Location:</strong> {user.location}</h6>
                    <h6 className={"mb-1"}><strong>Biography:</strong> {user.bio}</h6>
                    <h6 className={"mb-3"}><strong>Phone Number:</strong> {user.phone}</h6>
                    <div className={"d-flex justify-content-center gap-3"}>
                        <button
                            type={"button"}
                            onClick={() => setIsEditing(true)}
                            className={"btn btn-secondary"}
                        >
                            Edit Profile
                        </button>
                        <button
                            type={"button"}
                            onClick={handleLogOut}
                            className={"btn btn-danger"}
                        >
                            Log Out
                        </button>
                    </div>
                </>
                )}
                {isEditing && (
                    <EditProfileForm
                        user={user}
                        onCancel={() => setIsEditing(false)}
                        onSave={() => setIsEditing(false)}
                    />
                )}
            </div>
        </>
    );
}

{/* function that handles the state switch for when we start to edit the profile*/}

function EditProfileForm({ user, onCancel, onSave }) {

    const [form, setForm] = useState({
        fullName: user.fullName || "",
        email: user.email || "",
        location: user.location || "",
        bio: user.bio || "",
        phone: user.phone || ""
    });

    const update = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form>
            <div className={"mb-3"}>
                <label className={"form-label"}>Full Name</label>
                <input
                    name={"fullName"}
                    className={"form-control"}
                    value={form.fullName}
                    onChange={update}
                />
                <label className={"form-label"}>Email</label>
                <input
                    name={"email"}
                    className={"form-control"}
                    value={form.email}
                    onChange={update}
                />
                <label className={"form-label"}>Location</label>
                <input
                    name={"location"}
                    className={"form-control"}
                    value={form.location}
                    onChange={update}
                />
                <label className={"form-label"}>Biography</label>
                <textarea
                    name={"bio"}
                    className={"form-control"}
                    rows={4}
                    value={form.bio}
                    onChange={update}
                />
                <label className={"form-label"}>Phone Number</label>
                <input
                    name={"phone"}
                    className={"form-control"}
                    value={form.phone}
                    onChange={update}
                />
            </div>

            <button
                type={"submit"}
                className={"btn btn-success me-2"}
                onClick={onSave}
            >
                Save
            </button>

            <button
                type={"button"}
                className={"btn btn-secondary"}
                onClick={onCancel}
            >
                Cancel
            </button>
        </form>
    );
}

export default Profile;
