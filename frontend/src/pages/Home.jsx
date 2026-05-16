import { useEffect, useState } from "react";
import { getTopNews, searchNews } from "../services/newsService";
import { addFavourite } from "../services/favouriteService";
import useAuth from "../hooks/useAuth";

const CATEGORIES = ["Top News", "Technology", "Sports", "Business", "Entertainment", "Health", "Science"];
const PLACEHOLDER = "https://placehold.co/400x250?text=No+Image";

const spinnerStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function Home() {
  const { token } = useAuth();
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favourites, setFavourites] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState("Top News");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchTopNews();
  }, []);

  const fetchTopNews = async () => {
    try {
      setLoading(true);
      setError("");
      setNoResults(false);
      setQuery("");
      setActiveCategory("Top News");
      const res = await getTopNews();
      const articles = (res.articles || []).filter(a => a.title && a.title !== "[Removed]");
      setNews(articles);
      setNoResults(articles.length === 0);
    } catch {
      setError("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchQuery) => {
    const q = searchQuery !== undefined ? searchQuery : query;
    if (!q.trim()) { fetchTopNews(); return; }
    try {
      setLoading(true);
      setError("");
      setNoResults(false);
      const res = await searchNews(q);
      const articles = (res.articles || []).filter(a => a.title && a.title !== "[Removed]");
      setNews(articles);
      setNoResults(articles.length === 0);
    } catch {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCategory = (category) => {
    setActiveCategory(category);
    if (category === "Top News") {
      fetchTopNews();
    } else {
      setQuery(category);
      handleSearch(category);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleFavourite = async (article) => {
    if (!token) { alert("Please login first"); return; }
    if (favourites.has(article.url)) return;
    try {
      await addFavourite(article, token);
      setFavourites(prev => new Set([...prev, article.url]));
    } catch {
      alert("Failed to add favourite");
    }
  };

  return (
    <div style={styles.container}>
      <style>{spinnerStyle}</style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.heading}>Top News</h1>
        <p style={styles.subHeading}>Stay updated with the latest headlines</p>
      </div>

      {/* Category Buttons */}
      <div style={styles.categoryContainer}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            style={{
              ...styles.categoryBtn,
              background: activeCategory === cat ? "#2563eb" : "#e5e7eb",
              color: activeCategory === cat ? "#fff" : "#374151",
              fontWeight: activeCategory === cat ? "bold" : "normal",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Section */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search news... (press Enter)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.searchInput}
        />
        <button onClick={() => handleSearch()} style={styles.searchBtn}>Search</button>
        <button onClick={fetchTopNews} style={styles.resetBtn}>Reset</button>
      </div>

      {/* Loader */}
      {loading && (
        <div style={styles.loaderContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loaderText}>Loading news...</p>
        </div>
      )}

      {/* Error */}
      {error && <div style={styles.error}>{error}</div>}

      {/* No Results */}
      {noResults && !loading && (
        <div style={styles.noResults}>
          😕 No news found for "<strong>{query}</strong>". Try a different keyword.
        </div>
      )}

      {/* News Cards */}
      <div style={styles.grid}>
        {news.map((article, index) => (
          <div key={index} style={styles.card}>
            <img
              src={article.urlToImage || PLACEHOLDER}
              alt="news"
              style={styles.image}
              onError={(e) => { e.target.src = PLACEHOLDER; }}
            />
            <div style={styles.cardBody}>
              <h3 style={styles.title}>{article.title}</h3>
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
                  style={styles.heartBtn}
                  title={favourites.has(article.url) ? "Added to favourites" : "Add to favourites"}
                >
                  <span style={{
                    fontSize: "24px",
                    color: favourites.has(article.url) ? "#ef4444" : "#d1d5db",
                    transition: "color 0.2s"
                  }}>
                    {favourites.has(article.url) ? "❤️" : "🤍"}
                  </span>
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
  header: { marginBottom: "20px" },
  heading: { margin: 0, fontSize: "32px", color: "#111827" },
  subHeading: { marginTop: "8px", color: "#6b7280", fontSize: "15px" },

  categoryContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px"
  },
  categoryBtn: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s"
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
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "15px"
  },
  searchBtn: {
    padding: "12px 22px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold"
  },
  resetBtn: {
    padding: "12px 22px",
    border: "none",
    borderRadius: "10px",
    background: "#6b7280",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold"
  },

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
    borderTop: "4px solid #2563eb",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },
  loaderText: { color: "#6b7280", fontSize: "15px", margin: 0 },

  error: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#ef4444",
    fontWeight: "bold",
    padding: "15px",
    background: "#fef2f2",
    borderRadius: "10px"
  },
  noResults: {
    textAlign: "center",
    padding: "40px",
    color: "#6b7280",
    fontSize: "18px",
    background: "#fff",
    borderRadius: "12px",
    marginBottom: "20px"
  },

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
  title: { fontSize: "17px", marginBottom: "10px", color: "#111827", lineHeight: "1.4" },
  description: {
    color: "#6b7280",
    fontSize: "14px",
    lineHeight: "1.6",
    marginBottom: "16px",
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
    padding: "4px",
    lineHeight: 1
  }
};