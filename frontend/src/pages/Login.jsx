import { useState } from "react";
import { loginUser } from "../services/authService";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    const res = await loginUser(data);

    if (res.token) {
      localStorage.setItem("token", res.token);
      setToken(res.token);

      navigate("/home");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.title}>News App</h1>

        <p style={styles.subtitle}>
          Login to continue
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          style={styles.input}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          style={styles.input}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.bottomText}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register here
          </Link>
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
    background:
      "linear-gradient(to right, #1e3c72, #2a5298)",
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

  title: {
    marginBottom: "10px",
    color: "#1e3c72"
  },

  subtitle: {
    marginBottom: "25px",
    color: "#555"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#1e3c72",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  },

  bottomText: {
    marginTop: "20px",
    fontSize: "14px"
  },

  link: {
    color: "#1e3c72",
    textDecoration: "none",
    fontWeight: "bold"
  }
};