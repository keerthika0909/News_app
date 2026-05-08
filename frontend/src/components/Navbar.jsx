import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { token, setToken } = useAuth();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);

    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>

      <h2 style={styles.logo}>News App</h2>

      <div style={styles.links}>

        {token && (
          <>
            <Link to="/home" style={styles.link}>
              Home
            </Link>

            <Link to="/favourites" style={styles.link}>
              Favourites
            </Link>

            <button
              onClick={logout}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

const styles = {
  navbar: {
    width: "100%",
    background: "#111827",
    color: "#fff",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "15px 40px",

    boxSizing: "border-box",

    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  logo: {
    margin: 0
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500"
  },

  logoutBtn: {
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer"
  }
};