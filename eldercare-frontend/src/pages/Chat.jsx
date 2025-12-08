import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function Chat({ user }) {
    const { bookingId } = useParams();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        loadMessages();
        const interval = setInterval(loadMessages, 2000); // auto refresh
        return () => clearInterval(interval);
    }, []);

    const loadMessages = async () => {
        const res = await API.get(`/messages/${bookingId}`);
        setMessages(res.data);
    };

    const send = async () => {
        if (!text.trim()) return;

        await API.post("/messages", {
            bookingId,
            senderId: user.id,
            senderName: user.fullName,
            content: text,
        });

        setText("");
        loadMessages();
    };

    return (
        <div className="container mt-4" style={{ maxWidth: 600 }}>
            <h3>Chat</h3>

            <div style={{
                border: "1px solid #ddd",
                height: "400px",
                overflowY: "auto",
                padding: "10px",
                marginBottom: "10px"
            }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{
                        textAlign: msg.senderId === user.id ? "right" : "left"
                    }}>
                        <strong>{msg.senderName}</strong>
                        <div style={{
                            display: "inline-block",
                            padding: "8px 12px",
                            background: msg.senderId === user.id ? "#00bebd" : "#eee",
                            color: msg.senderId === user.id ? "white" : "black",
                            borderRadius: "12px",
                            margin: "5px 0"
                        }}>
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex gap-2">
                <input
                    className="form-control"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Type your message..."
                />
                <button className="btn btn-primary" onClick={send}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
