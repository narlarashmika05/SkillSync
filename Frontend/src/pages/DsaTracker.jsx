import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/DsaTracker.css";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
function DsaTracker() {

    const [problems, setProblems] = useState([]);

    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [status, setStatus] = useState("Solved");
    const [search, setSearch] = useState("");
const [difficultyFilter, setDifficultyFilter] = useState("");
const [statusFilter, setStatusFilter] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchProblems = async () => {

        try {
            const token = localStorage.getItem("token");
            const userEmail = localStorage.getItem("userEmail");

            const response = await api.get(`/problems/user/${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProblems(response.data);

        } catch (error) {

            console.log(error);

        }finally {

        setLoading(false);

    }

    };

    useEffect(() => {
        // Initial data load on mount; state updates happen after the request resolves
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProblems();
    }, []);

     if (loading) {
        return <Layout><Loader /></Layout>;
    }


    const addProblem = async () => {

        try {

            const token = localStorage.getItem("token");
            const userEmail = localStorage.getItem("userEmail");
            await api.post(
                "/problems",
                {
                    title,
                    topic,
                    difficulty,
                    status,
                    userEmail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Problem Added Successfully");

            clearForm();

            fetchProblems();

        } catch (error) {

            console.log(error);
            alert("Failed to add problem");

        }

    };

    const deleteProblem = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/problems/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Problem Deleted Successfully");

            fetchProblems();

        } catch (error) {

            console.log(error);
            alert("Failed to delete problem");

        }

    };

    const editProblem = (problem) => {

        setTitle(problem.title);
        setTopic(problem.topic);
        setDifficulty(problem.difficulty);
        setStatus(problem.status);

        setEditingId(problem.id);

    };

    const updateProblem = async () => {

        try {

            const token = localStorage.getItem("token");
            const userEmail = localStorage.getItem("userEmail");
            await api.put(
                `/problems/${editingId}`,
                {
                    title,
                    topic,
                    difficulty,
                    status,
                    userEmail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Problem Updated Successfully");

            clearForm();

            setEditingId(null);

            fetchProblems();

        } catch (error) {

    console.log("Update Error:", error);

    if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
    }

    alert("Failed to update problem");

}

    };

    const clearForm = () => {

        setTitle("");
        setTopic("");
        setDifficulty("Easy");
        setStatus("Solved");

    };

    return (

        <Layout>
        <div className="dsa-container">

            <h1>DSA Tracker</h1>

            <div className="problem-form">

                <input
                    type="text"
                    placeholder="Problem Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />

                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option>Solved</option>
                    <option>Unsolved</option>
                </select>

                {
                    editingId ?

                    <button onClick={updateProblem}>
                        Update Problem
                    </button>

                    :

                    <button onClick={addProblem}>
                        Add Problem
                    </button>
                }

            </div>
            <div className="filter-section">

    <input
        type="text"
        placeholder="Search Problem..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

    <select
        value={difficultyFilter}
        onChange={(e) => setDifficultyFilter(e.target.value)}
    >
        <option value="">All Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
    </select>

    <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
    >
        <option value="">All Status</option>
        <option value="Solved">Solved</option>
        <option value="Unsolved">Unsolved</option>
    </select>

</div>

{loading ? (

    <h2>Loading...</h2>

) : (
            <table>

                <thead>

                    <tr>
                        <th>Title</th>
                        <th>Topic</th>
                        <th>Difficulty</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

    {problems
        .filter((problem) =>
            problem.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((problem) =>
            difficultyFilter === "" ||
            problem.difficulty === difficultyFilter
        )
        .filter((problem) =>
            statusFilter === "" ||
            problem.status === statusFilter
        )
        .map((problem) => (

            <tr key={problem.id}>

                <td>{problem.title}</td>
                <td>{problem.topic}</td>
                <td>{problem.difficulty}</td>
                <td>{problem.status}</td>

                <td>

                    <button
                        onClick={() => editProblem(problem)}
                        style={{
                            background: "#0d6efd",
                            color: "white",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginRight: "8px"
                        }}
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => deleteProblem(problem.id)}
                        style={{
                            background: "#dc3545",
                            color: "white",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        Delete
                    </button>

                </td>

            </tr>

        ))}

</tbody>

            </table>
            )}

        </div>
        </Layout>

    );
}

export default DsaTracker;