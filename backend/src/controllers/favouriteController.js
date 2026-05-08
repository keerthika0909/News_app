const Fav = require("../models/Favourite");


// Add Favourite
exports.add = (req, res) => {

  console.log(req.body);
  console.log(req.user);

  Fav.addFavourite(

    req.user,

    req.body,

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          msg: "Database error"
        });
      }

      res.json({
        msg: "Favourite added"
      });
    }
  );
};


// Get All Favourites
exports.getAll = (req, res) => {

  Fav.getFavourites(

    req.user,

    (err, data) => {

      if (err) {

        return res.status(500).json({
          msg: "Fetch failed"
        });
      }

      res.json(data);
    }
  );
};


// Delete Favourite
exports.remove = (req, res) => {

  Fav.removeFavourite(

    req.params.id,

    (err) => {

      if (err) {

        return res.status(500).json({
          msg: "Delete failed"
        });
      }

      res.json({
        msg: "Deleted"
      });
    }
  );
};