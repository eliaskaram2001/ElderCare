import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Marketplace from "./pages/Marketplace";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";

function App() {
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter>
            <div style={{ padding: 20 }}>
                <Link to="/">Marketplace</Link> |
                <Link to="/login"> Login</Link> |
                <Link to="/register"> Register</Link> |
                {user && <Link to="/profile"> Profile</Link>}
            </div>

            <Routes>
                <Route path="/" element={<Marketplace user={user} />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-post" element={<CreatePost user={user} />} />
                <Route path="/profile" element={<Profile user={user} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
