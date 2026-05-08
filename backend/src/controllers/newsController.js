exports.getTopNews = async (req, res) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&language=en&apiKey=${process.env.NEWS_API_KEY}`
    );

    const data = await response.json();

    console.log("API RESPONSE:", data); // debug

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

exports.searchNews = async (req, res) => {
  try {
    const { q } = req.query;

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}&sortBy=publishedAt&language=en&apiKey=${process.env.NEWS_API_KEY}`
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
};