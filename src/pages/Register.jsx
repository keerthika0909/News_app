import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleRegister = async () => {
    await registerUser(data);

    alert("Registration Successful");

    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.title}>Create Account</h1>

        <p style={styles.subtitle}>
          Register to continue
        </p>

        <input
          type="text"
          placeholder="Enter Name"
          style={styles.input}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

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

        <button style={styles.button} onClick={handleRegister}>
          Register
        </button>

        <p style={styles.bottomText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login here
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
      "linear-gradient(to right, #141e30, #243b55)",
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
    color: "#243b55"
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
    background: "#243b55",
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
    color: "#243b55",
    textDecoration: "none",
    fontWeight: "bold"
  }
};