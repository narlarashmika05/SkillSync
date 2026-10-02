import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {

      await api.post("/users/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful. Please log in.");

      navigate("/login");

    } catch (error) {

      if (!error.response) {
        alert("Unable to connect to the server. Please make sure the backend is running.");
      } else if (error.response.status === 400 || error.response.status === 409) {
        alert("This email is already registered. Please log in instead.");
      } else {
        alert("Registration failed. Please try again.");
      }

    }

  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h1 className="logo">SkillSync AI</h1>

        <p className="subtitle">
          Create your account to get started
        </p>

        <input
          type="text"
          placeholder="Full Name"
          className="input-box"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="register-text">
          Already have an account?
          <a href="/login"> Login</a>
        </p>

      </div>

    </div>

  );
}

export default Register;
