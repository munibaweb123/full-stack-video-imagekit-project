"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        if (result?.error) {
            alert("Login failed: " + result.error);
        } else {
            router.push("/");
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
                <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#2d3748" }}>Login</h1>
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
                        Login
                    </button>
                </form>
                <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#64748b" }}>
                    Don&apos;t have an account?{" "}
                    <a
                        href="/register"
                        style={{ color: "#2563eb", textDecoration: "underline", cursor: "pointer" }}
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
