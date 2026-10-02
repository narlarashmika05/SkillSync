import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";
import "../styles/Dashboard.css";
import Loader from "../components/Loader";
function Dashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProblems: 0,
    totalAssessments: 0,
    totalInterviews: 0,
  });

  const [recentProblems, setRecentProblems] = useState([]);
  const [recentInterviews, setRecentInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        const userEmail = localStorage.getItem("userEmail");

        // Dashboard Stats
        const dashboardResponse = await api.get(`/dashboard/${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(dashboardResponse.data);

        // Recent Problems
        const problemsResponse = await api.get(
  `/problems/user/${userEmail}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        setRecentProblems(
          problemsResponse.data.slice(-5).reverse()
        );

        // Recent Interviews
        const interviewsResponse = await api.get(
  `/interviews/user/${userEmail}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        setRecentInterviews(
          interviewsResponse.data.slice(-5).reverse()
        );

      } catch (err) {
        console.log("Dashboard Error:", err);
        setError("Unable to load dashboard data. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }

    };

    fetchDashboard();

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");

  };

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (

    <Layout>

      <div className="dashboard">

        <div className="navbar">

          <h2>SkillSync AI</h2>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        {error && <div className="dashboard-error">{error}</div>}

        <div className="welcome">

          <h1>Welcome to SkillSync</h1>

          <p>
            Track your coding progress, assessments and interviews
            in one place.
          </p>

        </div>

        <div className="dashboard-grid">

          <div
            className="dashboard-card"
            onClick={() => navigate("/dsa")}
          >
            <h3>📚 Problems Solved</h3>
            <h2>{stats.totalProblems}</h2>
          </div>

          <div
            className="dashboard-card"
            onClick={() => navigate("/assessments")}
          >
            <h3>📝 Assessments</h3>
            <h2>{stats.totalAssessments}</h2>
          </div>

          <div
            className="dashboard-card"
            onClick={() => navigate("/interview")}
          >
            <h3>💼 Interviews</h3>
            <h2>{stats.totalInterviews}</h2>
          </div>

        </div>

        <div className="quick-actions">

          <button onClick={() => navigate("/dsa")}>
            Practice DSA
          </button>

          <button onClick={() => navigate("/assessments")}>
            Take Assessment
          </button>

          <button onClick={() => navigate("/interview")}>
            Interview Tracker
          </button>

          <button onClick={() => navigate("/ai")}>
            AI Assistant
          </button>

        </div>

        <div className="recent-section">

          <h2>Recent Problems</h2>

          <ul>

            {recentProblems.length === 0 ? (

              <li>No problems added yet.</li>

            ) : (

              recentProblems.map((problem) => (

                <li key={problem.id}>

                  <strong>{problem.title}</strong>

                  <br />

                  Topic: {problem.topic}

                  {" | "}

                  Difficulty: {problem.difficulty}

                  {" | "}

                  Status: {problem.status}

                </li>

              ))

            )}

          </ul>

        </div>

        <div className="recent-section">

          <h2>Recent Interviews</h2>

          <ul>

            {recentInterviews.length === 0 ? (

              <li>No interviews added yet.</li>

            ) : (

              recentInterviews.map((interview) => (

                <li key={interview.id}>

                  <strong>{interview.company}</strong>

                  <br />

                  Rating: ⭐ {interview.rating}/5

                </li>

              ))

            )}

          </ul>

        </div>

      </div>

    </Layout>

  );

}

export default Dashboard;