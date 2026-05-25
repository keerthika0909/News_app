const axios = require("axios");

exports.getTopNews = async (req, res) => {

  try {

    const response = await axios.get(

      `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&language=en&apiKey=${process.env.NEWS_API_KEY}`

    );

    res.json(response.data);

  } catch (error) {

    console.log(error.message);

    res.status(500).json({
      error: "Failed to fetch news"
    });
  }
};

exports.searchNews = async (req, res) => {

  try {

    const { q } = req.query;

    const response = await axios.get(

      `https://newsapi.org/v2/everything?q=${q}&sortBy=publishedAt&language=en&apiKey=${process.env.NEWS_API_KEY}`

    );

    res.json(response.data);

  } catch (error) {

    console.log(error.message);

    res.status(500).json({
      error: "Search failed"
    });
  }
};