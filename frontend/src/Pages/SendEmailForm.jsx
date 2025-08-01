import React, { useState } from 'react';
import axios from 'axios';

export default function SendEmailForm() {
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8000/api/email/send-email", {
                to,
                subject,
                message,
            });

            setStatus(res.data.previewUrl || res.data.message);
        } catch (err) {
            setStatus(err.response?.data?.message || "Failed to send email");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Send Email</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder="Enter recipient email"
                        className="form-control"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Subject"
                        className="form-control"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        placeholder="Message"
                        className="form-control"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Email</button>
            </form>

            {status && typeof status === "string" && (
                <p className="mt-3 alert alert-info">{status}</p>
            )}

            {status?.includes("http") && (
                <p className="mt-2">
                    🔗 <a href={status} target="_blank" rel="noopener noreferrer">View Email Preview</a>
                </p>
            )}
        </div>
    );
}
