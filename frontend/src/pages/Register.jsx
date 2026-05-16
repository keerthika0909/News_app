import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async () => {
    setError("");

    // Validation
    if (!data.name.trim()) { setError("Name is required"); return; }
    if (!data.email.trim()) { setError("Email is required"); return; }
    if (!validateEmail(data.email)) { setError("Please enter a valid email address"); return; }
    if (!data.password) { setError("Password is required"); return; }
    if (data.password.length < 6) { setError("Password must be at least 6 characters"); return; }

    try {
      setLoading(true);
      const res = await registerUser(data);

      // Check for duplicate email or other errors
      if (res && res.code === "ER_DUP_ENTRY") {
        setError("This email is already registered. Please login instead.");
        return;
      }
      if (res && res.msg && res.msg.toLowerCase().includes("exist")) {
        setError("This email is already registered. Please login instead.");
        return;
      }
      if (res && (res.errno === 1062 || (res.sqlMessage && res.sqlMessage.includes("Duplicate")))) {
        setError("This email is already registered. Please login instead.");
        return;
      }

      alert("Registration Successful! Please login.");
      navigate("/login");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Register to continue</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <input
          type="text"
          placeholder="Enter Name"
          style={styles.input}
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          onKeyDown={handleKeyDown}
        />

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
          placeholder="Enter Password (min 6 chars)"
          style={styles.input}
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        <button
          style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p style={styles.bottomText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Login here</Link>
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
    background: "linear-gradient(to right, #141e30, #243b55)",
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
  title: { marginBottom: "10px", color: "#243b55" },
  subtitle: { marginBottom: "25px", color: "#555" },
  errorBox: {
    background: "#fef2f2",
    color: "#ef4444",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "left"
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
    background: "#243b55",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  bottomText: { marginTop: "20px", fontSize: "14px" },
  link: { color: "#243b55", textDecoration: "none", fontWeight: "bold" }
};