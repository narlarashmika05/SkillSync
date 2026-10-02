import { useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import "../styles/AIAssistant.css";

const PRESETS = [
  { label: "Java Interview", prompt: "Generate 5 Java interview questions with brief answers." },
  { label: "DSA Questions", prompt: "Generate 5 DSA interview questions covering arrays and trees." },
  { label: "OOP Concepts", prompt: "Explain the 4 pillars of OOP with simple examples." },
  { label: "HR Interview", prompt: "Give me 5 common HR interview questions and how to answer them." },
  { label: "Mock Interview", prompt: "Act as an interviewer and start a mock technical interview for a Java backend role." },
  { label: "Explain Binary Search", prompt: "Explain binary search in simple words with an example." },
];

function getErrorMessage(error) {
  if (!error.response) {
    return "Unable to connect to the server. Please make sure the backend is running.";
  }

  const { status, data } = error.response;

  if (typeof data === "string" && data.trim().length > 0) {
    return data;
  }

  switch (status) {
    case 400:
      return "Please enter a valid question.";
    case 401:
      return "Your session has expired. Please log in again.";
    case 403:
      return "You are not authorized to use the AI Assistant. Please log in again.";
    case 429:
      return "Gemini AI quota is currently unavailable. Please try again later.";
    case 500:
    case 502:
    case 503:
      return "The AI Assistant is temporarily unavailable. Please try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
}

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askAI = async () => {
    if (!question.trim() || loading) {
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/ai/chat",
        { prompt: question },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = typeof res.data === "string" ? res.data : "";

      if (!text.trim()) {
        setError("Gemini AI did not return a response. Please try again.");
      } else {
        setResponse(text);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setQuestion("");
    setResponse("");
    setError("");
  };

  return (
    <Layout>
      <div className="ai-container">
        <h1>🤖 SkillSync AI Assistant</h1>
        <p className="ai-subtitle">
          Ask interview and DSA questions, powered by Google Gemini.
        </p>

        <div className="ai-buttons">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setQuestion(preset.prompt)}
              disabled={loading}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <textarea
          rows="6"
          placeholder="Ask anything..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />

        <div className="ai-actions">
          <button
            type="button"
            className="ask-btn"
            onClick={askAI}
            disabled={loading || !question.trim()}
          >
            {loading ? "Asking..." : "Ask AI"}
          </button>

          <button
            type="button"
            className="clear-btn"
            onClick={clearAll}
            disabled={loading}
          >
            Clear
          </button>
        </div>

        {loading && <Loader />}

        {error && <div className="ai-error">{error}</div>}

        {response && (
          <div className="response">
            <h3>Response</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default AIAssistant;
