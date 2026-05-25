const db = require("../../config/db");

exports.createUser = async (
  name,
  email,
  password,
  cb
) => {

  try {

    const [result] = await db.query(

      "INSERT INTO users (name,email,password) VALUES (?,?,?)",

      [name, email, password]

    );

    cb(null, result);

  } catch (err) {

    cb(err, null);
  }
};

exports.findUserByEmail = async (
  email,
  cb
) => {

  try {

    const [rows] = await db.query(

      "SELECT * FROM users WHERE email=?",

      [email]

    );

    cb(null, rows);

  } catch (err) {

    cb(err, null);
  }
};