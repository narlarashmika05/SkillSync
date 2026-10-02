import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Assessment.css";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
function Assessments() {

    const [assessments, setAssessments] = useState([]);

    const [title, setTitle] = useState("");
    const [score, setScore] = useState("");
    const [totalMarks, setTotalMarks] = useState("");
    const [search, setSearch] = useState("");
const [resultFilter, setResultFilter] = useState("");
    const [editingId, setEditingId] = useState(null);
const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalAssessments: 0,
        totalScore: 0,
        totalMarks: 0,
        averagePercentage: 0,
    });

    // Fetch all assessments
    const fetchAssessments = async () => {

        try {

            const token = localStorage.getItem("token");
            const userEmail = localStorage.getItem("userEmail");

            const response = await api.get(`/assessments/user/${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAssessments(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    // Fetch statistics
    const fetchStats = async () => {

        try {

            const token = localStorage.getItem("token");
            const userEmail = localStorage.getItem("userEmail");

            const response = await api.get(`/assessments/stats/${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setStats(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        // Initial data load on mount; state updates happen after the request resolves
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAssessments();
        fetchStats();
    }, []);

    // Add Assessment
    const addAssessment = async () => {

        try {

            const token = localStorage.getItem("token");
            const userEmail = localStorage.getItem("userEmail");
            await api.post(
                "/assessments",
                {
                    title,
                    score,
                    totalMarks,
                    userEmail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Assessment Added Successfully");

            setTitle("");
            setScore("");
            setTotalMarks("");

            fetchAssessments();
            fetchStats();

        } catch (error) {

            console.log(error);
            alert("Failed to Add Assessment");

        }

    };

    // Edit
    const editAssessment = (assessment) => {

        setEditingId(assessment.id);

        setTitle(assessment.title);
        setScore(assessment.score);
        setTotalMarks(assessment.totalMarks);

    };

    // Update
    const updateAssessment = async () => {

        try {

            const token = localStorage.getItem("token");
            const userEmail = localStorage.getItem("userEmail");
            await api.put(
                `/assessments/${editingId}`,
                {
                    title,
                    score,
                    totalMarks,
                    userEmail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Assessment Updated Successfully");

            setEditingId(null);

            setTitle("");
            setScore("");
            setTotalMarks("");

            fetchAssessments();
            fetchStats();

        } catch (error) {

            console.log(error);
            alert("Failed to Update Assessment");

        }

    };

    // Delete
    const deleteAssessment = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/assessments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Assessment Deleted Successfully");

            fetchAssessments();
            fetchStats();

        } catch (error) {

            console.log(error);
            alert("Failed to Delete Assessment");

        }

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
        <div className="assessment-container">

            <h1>Assessment Tracker</h1>

            <div className="assessment-form">

                <input
                    type="text"
                    placeholder="Assessment Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Score"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Total Marks"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                />

                <button
                    onClick={
                        editingId
                            ? updateAssessment
                            : addAssessment
                    }
                >
                    {
                        editingId
                            ? "Update Assessment"
                            : "Add Assessment"
                    }
                </button>

            </div>

            <div className="stats">

                <div className="card">
                    <h3>Total Assessments</h3>
                    <h2>{stats.totalAssessments}</h2>
                </div>

                <div className="card">
                    <h3>Total Score</h3>
                    <h2>{stats.totalScore}</h2>
                </div>

                <div className="card">
                    <h3>Average %</h3>
                    <h2>{stats.averagePercentage.toFixed(1)}%</h2>
                </div>

            </div>
            <div className="filter-section">

    <input
        type="text"
        placeholder="Search Assessment..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

    <select
        value={resultFilter}
        onChange={(e) => setResultFilter(e.target.value)}
    >
        <option value="">All Results</option>
        <option value="Pass">Pass</option>
        <option value="Fail">Fail</option>
    </select>

</div>

            <table>

                <thead>

                    <tr>
                        <th>Title</th>
                        <th>Score</th>
                        <th>Total Marks</th>
                        <th>Percentage</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

    {assessments
        .filter((assessment) =>
            assessment.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((assessment) =>
            resultFilter === "" ||
            (((assessment.score / assessment.totalMarks) * 100) >= 50
                ? "Pass"
                : "Fail") === resultFilter
        )
        .map((assessment) => (

            <tr key={assessment.id}>

                <td>{assessment.title}</td>
                <td>{assessment.score}</td>
                <td>{assessment.totalMarks}</td>

                <td>
                    {(
                        (assessment.score / assessment.totalMarks) * 100
                    ).toFixed(1)}%
                </td>

                <td>

                    <button
                        onClick={() => editAssessment(assessment)}
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => deleteAssessment(assessment.id)}
                    >
                        Delete
                    </button>

                </td>

            </tr>

        ))}

</tbody>

            </table>

        </div>
        </Layout>

    );

}

export default Assessments;