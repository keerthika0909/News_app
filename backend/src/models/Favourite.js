const db = require("../../config/db");

exports.addFavourite = async (
  userId,
  article,
  cb
) => {

  try {

    const [result] = await db.query(

      `
      INSERT INTO favourites
      (user_id, title, url, image)
      VALUES (?, ?, ?, ?)
      `,

      [
        userId,
        article.title,
        article.url,
        article.urlToImage
      ]
    );

    cb(null, result);

  } catch (err) {

    cb(err, null);
  }
};

exports.getFavourites = async (
  userId,
  cb
) => {

  try {

    const [rows] = await db.query(

      `
      SELECT * FROM favourites
      WHERE user_id = ?
      `,

      [userId]
    );

    cb(null, rows);

  } catch (err) {

    cb(err, null);
  }
};

exports.removeFavourite = async (
  id,
  cb
) => {

  try {

    const [result] = await db.query(

      `
      DELETE FROM favourites
      WHERE id = ?
      `,

      [id]
    );

    cb(null, result);

  } catch (err) {

    cb(err, null);
  }
};