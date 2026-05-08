const db = require("../../config/db");

exports.addFavourite = (
  userId,
  article,
  cb
) => {

  db.query(

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
    ],

    cb
  );
};

exports.getFavourites = (
  userId,
  cb
) => {

  db.query(

    `
    SELECT * FROM favourites
    WHERE user_id = ?
    `,

    [userId],

    cb
  );
};

exports.removeFavourite = (
  id,
  cb
) => {

  db.query(

    `
    DELETE FROM favourites
    WHERE id = ?
    `,

    [id],

    cb
  );
};