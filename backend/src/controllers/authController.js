const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await hashPassword(password);

  User.createUser(name, email, hashed, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "User Registered" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, async (err, result) => {
    if (result.length === 0)
      return res.status(400).json({ msg: "User not found" });

    const valid = await comparePassword(password, result[0].password);

    if (!valid) return res.status(400).json({ msg: "Wrong password" });

    const token = generateToken(result[0].id);

    res.json({ token });
  });
};

exports.me = (req, res) => {
  res.json({ userId: req.user });
};