const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  try {

    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check header exists
    if (!authHeader) {
      return res.status(401).json({
        msg: "No token"
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Save user id
    req.user = decoded.id;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      msg: "Invalid token"
    });
  }
};