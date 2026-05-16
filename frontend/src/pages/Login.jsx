import { useState } from "react";
import { loginUser } from "../services/authService";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!data.email || !data.password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const res = await loginUser(data);
      if (res.token) {
        localStorage.setItem("token", res.token);
        setToken(res.token);
        navigate("/home");
      } else {
        setError(res.msg || "Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>News App</h1>
        <p style={styles.subtitle}>Login to continue</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <input
          type="email"
          placeholder="Enter Email"
          style={styles.input}
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        <input
          type="password"
          placeholder="Enter Password"
          style={styles.input}
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        <button
          style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.bottomText}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
    padding: "20px"
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  title: { marginBottom: "10px", color: "#1e3c72" },
  subtitle: { marginBottom: "25px", color: "#555" },
  errorBox: {
    background: "#fef2f2",
    color: "#ef4444",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
    fontSize: "14px"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#1e3c72",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  bottomText: { marginTop: "20px", fontSize: "14px" },
  link: { color: "#1e3c72", textDecoration: "none", fontWeight: "bold" }
};