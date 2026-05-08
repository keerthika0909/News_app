import { useEffect, useState } from "react";
import { getTopNews, searchNews } from "../services/newsService";
import { addFavourite } from "../services/favouriteService";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { token } = useAuth();

  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch top news on page load
  useEffect(() => {
    fetchTopNews();
  }, []);

  // Get Top News
  const fetchTopNews = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getTopNews();

      setNews(res.articles || []);
    } catch (err) {
      setError("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  // Search News
  const handleSearch = async () => {
    if (!query.trim()) {
      fetchTopNews();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await searchNews(query);

      setNews(res.articles || []);
    } catch (err) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // Add Favourite
  const handleFavourite = async (article) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await addFavourite(article, token);

      alert("Added to favourites ❤️");
    } catch (err) {
      console.log(err);

      alert("Failed to add favourite");
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.heading}>Top News</h1>
        <p style={styles.subHeading}>
          Stay updated with the latest headlines
        </p>
      </div>

      {/* Search Section */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.searchInput}
        />

        <button
          onClick={handleSearch}
          style={styles.searchBtn}
        >
          Search
        </button>

        <button
          onClick={fetchTopNews}
          style={styles.resetBtn}
        >
          Reset
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div style={styles.message}>
          Loading news...
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {/* News Cards */}
      <div style={styles.grid}>
        {news.map((article, index) => (
          <div key={index} style={styles.card}>

            <img
              src={
                article.urlToImage ||
                "https://via.placeholder.com/400x250"
              }
              alt="news"
              style={styles.image}
            />

            <div style={styles.cardBody}>

              <h3 style={styles.title}>
                {article.title}
              </h3>

              <p style={styles.description}>
                {article.description
                  ? article.description.slice(0, 100) + "..."
                  : "No description available"}
              </p>

              <div style={styles.buttonContainer}>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.readBtn}
                >
                  Read More
                </a>

                <button
                  onClick={() => handleFavourite(article)}
                  style={styles.favBtn}
                >
                  ❤️ Favourite
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

  header: {
    marginBottom: "30px"
  },

  heading: {
    margin: 0,
    fontSize: "36px",
    color: "#111827"
  },

  subHeading: {
    marginTop: "10px",
    color: "#6b7280",
    fontSize: "16px"
  },

  searchContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
    flexWrap: "wrap"
  },

  searchInput: {
    flex: 1,
    minWidth: "250px",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "15px"
  },

  searchBtn: {
    padding: "14px 22px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold"
  },

  resetBtn: {
    padding: "14px 22px",
    border: "none",
    borderRadius: "10px",
    background: "#6b7280",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold"
  },

  message: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2563eb",
    fontWeight: "bold"
  },

  error: {
    textAlign: "center",
    marginBottom: "20px",
    color: "red",
    fontWeight: "bold"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "25px"
  },

  card: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "0.3s"
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
    fontSize: "20px",
    marginBottom: "12px",
    color: "#111827"
  },

  description: {
    color: "#4b5563",
    fontSize: "15px",
    lineHeight: "1.6",
    marginBottom: "20px"
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap"
  },

  readBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "bold"
  },

  favBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold"
  }
};