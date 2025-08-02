"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }
            alert("Registration successful!");
            router.push('/login');
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f4f6fa"
        }}>
            <div style={{
                background: "#fff",
                padding: "2rem 2.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                minWidth: "340px"
            }}>
                <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#2d3748" }}>Register</h1>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            padding: "0.75rem",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            fontSize: "1rem"
                        }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding: "0.75rem",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            fontSize: "1rem"
                        }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{
                            padding: "0.75rem",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            fontSize: "1rem"
                        }}
                        required
                    />
                    <button
                        type="submit"
                        style={{
                            background: "#2563eb",
                            color: "#fff",
                            padding: "0.75rem",
                            border: "none",
                            borderRadius: "6px",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            cursor: "pointer",
                            marginTop: "0.5rem"
                        }}
                    >
                        Register
                    </button>
                </form>
                <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#64748b" }}>
                    Already have an account?{" "}
                    <a
                        href="/login"
                        style={{ color: "#2563eb", textDecoration: "underline", cursor: "pointer" }}
                    >
                        Login
                    </a>
                </p>
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <button
                        onClick={() => router.push('/login')}
                        style={{
                            background: "none",
                            color: "#2563eb",
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline",
                            fontSize: "1rem"
                        }}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}