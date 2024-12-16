import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect authenticated users to /home
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/home");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (err) {
      setError("Failed to login with Google. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          width: "100%",
          gap: "20px",
        }}
      >
        {/* Removed logo images */}
      </div>
<h1 style={{ marginBottom: "10px" }}>SIMPLE LEADS MANAGEMENT WEBSITE</h1>
      <h2 style={{ marginBottom: "30px", fontSize: "18px", color: "#555" }}>
        SIMPLE LEADS MANAGEMENT WEBSITE made with ♥ by<span style={{ fontWeight: "bold" }}>CompanyZer0</span>
      </h2>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "300px",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          gap: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "white",
          cursor: "pointer",
        }}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRB4kg1jgnqD5fEaCSHKMoUdFeTBj9CH_opA&s"
          alt="Google Logo"
          style={{ width: "20px", height: "20px" }}
        />
        Login with Google
      </button>
    </div>
  );
}

export default Login;
