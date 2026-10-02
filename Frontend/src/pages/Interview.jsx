import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Interview.css";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
function Interview() {

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [interviewDate, setInterviewDate] = useState("");
    const [status, setStatus] = useState("Pending");
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState("");
    const [search, setSearch] = useState("");
    const [ratingFilter, setRatingFilter] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [stats, setStats] = useState({
        totalInterviews: 0,
        averageRating: 0
    });

    const fetchInterviews = async () => {

        try {

            const token = localStorage.getItem("token");
            const userEmail = localStorage.getItem("userEmail");

            const response = await api.get(`/interviews/user/${userEmail}`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setInterviews(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const fetchStats = async () => {

        try {

            const token = localStorage.getItem("token");
            const userEmail = localStorage.getItem("userEmail");

            const response = await api.get(`/interviews/stats/${userEmail}`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setStats(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        // Initial data load on mount; state updates happen after the request resolves
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchInterviews();
        fetchStats();

    }, []);

    const addInterview = async () => {

        try {

            const token = localStorage.getItem("token");
            const userEmail = localStorage.getItem("userEmail");
            await api.post("/interviews",

                {
                    company,
                    role,
                    interviewDate,
                    status,
                    feedback,
                    rating,
                    userEmail
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("Interview Added Successfully");

            clearForm();

            fetchInterviews();
            fetchStats();

        } catch (error) {

            console.log(error);

        }

    };

    const editInterview = (interview) => {

        setEditingId(interview.id);

        setCompany(interview.company);
        setRole(interview.role);
        setInterviewDate(interview.interviewDate);
        setStatus(interview.status);
        setFeedback(interview.feedback);
        setRating(interview.rating);

    };

    const updateInterview = async () => {

        try {

            const token = localStorage.getItem("token");
            const userEmail = localStorage.getItem("userEmail");
            await api.put(

                `/interviews/${editingId}`,

                {
                    company,
                    role,
                    interviewDate,
                    status,
                    feedback,
                    rating,
                    userEmail
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("Interview Updated Successfully");

            clearForm();

            setEditingId(null);

            fetchInterviews();
            fetchStats();

        } catch (error) {

            console.log(error);

        }

    };

    const deleteInterview = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/interviews/${id}`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            fetchInterviews();
            fetchStats();

        } catch (error) {

            console.log(error);

        }

    };

    const clearForm = () => {

        setCompany("");
        setRole("");
        setInterviewDate("");
        setStatus("Pending");
        setFeedback("");
        setRating("");

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
        <div className="interview-container">

            <h1>Interview Tracker</h1>

            <div className="stats">

                <div className="card">

                    <h3>Total Interviews</h3>
                    <h2>{stats.totalInterviews}</h2>

                </div>

                <div className="card">

                    <h3>Average Rating</h3>
                    <h2>{stats.averageRating.toFixed(1)}</h2>

                </div>

            </div>

            <div className="interview-form">

    <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
    />

    <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
    />

    <input
        type="date"
        value={interviewDate}
        onChange={(e) => setInterviewDate(e.target.value)}
    />

    <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
    >
        <option>Pending</option>
        <option>Selected</option>
        <option>Rejected</option>
    </select>

    <input
        type="text"
        placeholder="Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
    />

    <input
        type="number"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
    />

    <button
        onClick={
            editingId
                ? updateInterview
                : addInterview
        }
    >
        {
            editingId
                ? "Update Interview"
                : "Add Interview"
        }
    </button>

</div>
<div className="filter-section">

    <input
        type="text"
        placeholder="Search Company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

    <select
        value={ratingFilter}
        onChange={(e) => setRatingFilter(e.target.value)}
    >
        <option value="">All Ratings</option>
        <option value="5">5 ⭐</option>
        <option value="4">4 ⭐ & Above</option>
        <option value="3">3 ⭐ & Above</option>
    </select>

</div>
<table>

    <thead>

        <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Date</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Rating</th>
            <th>Actions</th>
        </tr>

    </thead>

    <tbody>

    {interviews
        .filter((interview) =>
            interview.company
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        .filter((interview) =>
            ratingFilter === "" ||
            interview.rating >= Number(ratingFilter)
        )
        .map((interview) => (

            <tr key={interview.id}>

                <td>{interview.company}</td>
                <td>{interview.role}</td>
                <td>{interview.interviewDate}</td>
                <td>{interview.status}</td>
                <td>{interview.feedback}</td>
                <td>{interview.rating}</td>

                <td>

                    <button
                        onClick={() => editInterview(interview)}
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => deleteInterview(interview.id)}
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

export default Interview;