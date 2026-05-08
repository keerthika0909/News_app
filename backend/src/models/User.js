const db = require("../../config/db");

exports.createUser = (name, email, password, cb) => {
  db.query(
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",
    [name, email, password],
    cb
  );
};

exports.findUserByEmail = (email, cb) => {
  db.query("SELECT * FROM users WHERE email=?", [email], cb);
};