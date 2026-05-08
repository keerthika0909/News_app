import { useEffect, useState } from "react";
import {
  getFavourites,
  deleteFavourite
} from "../services/favouriteService";

import useAuth from "../hooks/useAuth";

export default function Favourites() {

  const { token } = useAuth();

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Fetch favourites
  useEffect(() => {

    fetchFavourites();

  }, []);

  const fetchFavourites = async () => {

    try {

      setLoading(true);

      const res = await getFavourites(token);

      console.log(res);

      // Ensure array
      if (Array.isArray(res)) {
        setData(res);
      } else {
        setData([]);
        setError(res.msg || "Failed to load favourites");
      }

    } catch (err) {

      setError("Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  // Delete favourite
  const handleDelete = async (id) => {

    try {

      await deleteFavourite(id, token);

      setData(
        data.filter((item) => item.id !== id)
      );

    } catch {

      alert("Delete failed");

    }
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.heading}>
        My Favourites ❤️
      </h1>

      {/* Loading */}
      {loading && (
        <p style={styles.message}>
          Loading favourites...
        </p>
      )}

      {/* Error */}
      {error && (
        <p style={styles.error}>
          {error}
        </p>
      )}

      {/* Empty */}
      {!loading &&
        data.length === 0 &&
        !error && (
          <p style={styles.message}>
            No favourites added yet
          </p>
        )}

      {/* Cards */}
      <div style={styles.grid}>

        {data.map((item) => (

          <div
            key={item.id}
            style={styles.card}
          >

            <img
              src={
                item.image ||
                "https://via.placeholder.com/400x250"
              }
              alt="fav"
              style={styles.image}
            />

            <div style={styles.cardBody}>

              <h3 style={styles.title}>
                {item.title}
              </h3>

              <button
                onClick={() =>
                  handleDelete(item.id)
                }
                style={styles.deleteBtn}
              >
                Remove
              </button>

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
    minHeight: "100vh"
  },

  heading: {
    marginBottom: "30px",
    color: "#111827"
  },

  message: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "18px"
  },

  error: {
    textAlign: "center",
    color: "red",
    fontSize: "18px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "25px"
  },

  card: {
    background: "#fff",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover"
  },

  cardBody: {
    padding: "20px"
  },

  title: {
    fontSize: "18px",
    marginBottom: "20px",
    color: "#111827"
  },

  deleteBtn: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold"
  }
};