import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await api.post("/users/login", {
        email,
        password,
      });

      // Save JWT Token
      localStorage.setItem("token", response.data);

      // Save logged-in user's email
      localStorage.setItem("userEmail", email);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      if (!error.response) {
        alert("Unable to connect to the server. Please make sure the backend is running.");
      } else if (error.response.status === 401) {
        alert("Invalid email or password.");
      } else {
        alert("Login failed. Please try again.");
      }

    }

  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h1 className="logo">SkillSync AI</h1>

        <p className="subtitle">
          AI-Powered Interview Preparation Platform
        </p>

        <input
          type="email"
          placeholder="Email"
          className="input-box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input-box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="register-text">
          Don't have an account?
          <a href="/register"> Register</a>
        </p>

      </div>

    </div>

  );
}

export default Login;