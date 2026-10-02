import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">

      <div className="hero">

        <h1>SkillSync AI</h1>

        <h3>AI-Powered Interview Preparation Platform</h3>

        <p>
          Prepare smarter with DSA tracking, coding assessments,
          interview management, analytics, and an AI assistant—all in one place.
        </p>

        <div className="home-buttons">

          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>

        </div>

      </div>

      <div className="features">

        <div className="feature-card">
          <span>📚</span>
          <h3>DSA Tracker</h3>
          <p>Track solved problems by topic, difficulty, and status.</p>
        </div>

        <div className="feature-card">
          <span>📝</span>
          <h3>Assessments</h3>
          <p>Record coding tests and monitor your performance.</p>
        </div>

        <div className="feature-card">
          <span>💼</span>
          <h3>Interview Tracker</h3>
          <p>Manage interviews, feedback, ratings, and outcomes.</p>
        </div>

        <div className="feature-card">
          <span>📊</span>
          <h3>Analytics</h3>
          <p>Visualize your preparation progress with dashboards.</p>
        </div>

        <div className="feature-card">
          <span>🤖</span>
          <h3>AI Assistant</h3>
          <p>Get interview preparation help powered by AI.</p>
        </div>

      </div>

    </div>
  );
}

export default Home;