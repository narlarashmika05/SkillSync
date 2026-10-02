import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    return (
        <div className="sidebar">
            <h2>SkillSync</h2>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dsa">DSA Tracker</Link>
            <Link to="/assessments">Assessment</Link>
            <Link to="/interview">Interview</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/ai">AI Assistant</Link>
            <Link to="/profile">Profile</Link>
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}
export default Sidebar;
