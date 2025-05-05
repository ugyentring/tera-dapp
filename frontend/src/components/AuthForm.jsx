import React, { useState } from "react";
import axios from "axios";

const AuthForm = () => {
  const [email, setEmail] = useState("sapunamongar@example.com"); // Pre-provided email
  const [password, setPassword] = useState("sapunamongar@123");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid credentials");
      censole.error("Login Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default AuthForm;
