import { useEffect, useState } from "react";
import { getFavourites, deleteFavourite } from "../services/favouriteService";
import useAuth from "../hooks/useAuth";

const PLACEHOLDER = "https://placehold.co/400x250?text=No+Image";

const spinnerStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function Favourites() {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFavourites();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchFavourites = async () => {
    try {
      setLoading(true);
      const res = await getFavourites(token);
      if (Array.isArray(res)) {
        setData(res);
      } else {
        setData([]);
        setError(res.msg || "Failed to load favourites");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFavourite(id, token);
      setData(data.filter((item) => item.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div style={styles.container}>
      <style>{spinnerStyle}</style>

      <h1 style={styles.heading}>My Favourites ❤️</h1>

      {/* Loader */}
      {loading && (
        <div style={styles.loaderContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loaderText}>Loading favourites...</p>
        </div>
      )}

      {/* Error */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Empty */}
      {!loading && data.length === 0 && !error && (
        <div style={styles.empty}>
          <p style={styles.emptyIcon}>🤍</p>
          <p style={styles.emptyText}>No favourites added yet</p>
          <p style={styles.emptySubText}>Go to Home and click the heart icon on articles you like</p>
        </div>
      )}

      {/* Cards */}
      <div style={styles.grid}>
        {data.map((item) => (
          <div key={item.id} style={styles.card}>
            <img
              src={item.image || PLACEHOLDER}
              alt="fav"
              style={styles.image}
              onError={(e) => { e.target.src = PLACEHOLDER; }}
            />
            <div style={styles.cardBody}>
              <h3 style={styles.title}>{item.title}</h3>
              <div style={styles.buttonContainer}>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.readBtn}
                  >
                    Read More
                  </a>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  style={styles.heartBtn}
                  title="Remove from favourites"
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f3f4f6",
    minHeight: "100vh",
    boxSizing: "border-box"
  },
  heading: { marginBottom: "30px", color: "#111827", fontSize: "32px" },

  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    gap: "15px"
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e5e7eb",
    borderTop: "4px solid #ef4444",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },
  loaderText: { color: "#6b7280", fontSize: "15px", margin: 0 },

  error: { textAlign: "center", color: "#ef4444", fontSize: "16px" },

  empty: { textAlign: "center", padding: "60px 20px" },
  emptyIcon: { fontSize: "48px", margin: "0 0 10px" },
  emptyText: { fontSize: "20px", color: "#374151", fontWeight: "bold", margin: "0 0 8px" },
  emptySubText: { color: "#9ca3af", fontSize: "15px", margin: 0 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "25px"
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column"
  },
  image: { width: "100%", height: "210px", objectFit: "cover" },
  cardBody: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  title: {
    fontSize: "17px",
    marginBottom: "16px",
    color: "#111827",
    lineHeight: "1.4",
    flex: 1
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  readBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "9px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "bold"
  },
  heartBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "24px",
    padding: "4px",
    transition: "transform 0.2s"
  }
};