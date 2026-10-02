import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Analytics() {

  const [problemStats, setProblemStats] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  const [assessmentStats, setAssessmentStats] = useState({
    averagePercentage: 0,
  });

  const [interviewStats, setInterviewStats] = useState({
    averageRating: 0,
  });

  useEffect(() => {

    const fetchStats = async () => {

      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("userEmail");

      const problem = await api.get(`/problems/stats/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const assessment = await api.get(`/assessments/stats/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const interview = await api.get(`/interviews/stats/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProblemStats(problem.data);
      setAssessmentStats(assessment.data);
      setInterviewStats(interview.data);

    };

    fetchStats();

  }, []);

  const pieData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [
          problemStats.easy,
          problemStats.medium,
          problemStats.hard,
        ],
      },
    ],
  };

  const barData = {
    labels: ["Assessment %", "Interview Rating"],
    datasets: [
      {
        label: "Performance",
        data: [
          assessmentStats.averagePercentage,
          interviewStats.averageRating,
        ],
      },
    ],
  };

  return (
    <Layout>

      <h1>Analytics Dashboard</h1>

      <div style={{ width: "400px", marginBottom: "40px" }}>
        <Pie data={pieData} />
      </div>

      <div style={{ width: "500px" }}>
        <Bar data={barData} />
      </div>

    </Layout>
  );
}

export default Analytics;