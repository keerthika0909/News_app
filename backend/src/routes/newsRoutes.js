const router = require("express").Router();
const ctrl = require("../controllers/newsController");

router.get("/top", ctrl.getTopNews);
router.get("/search", ctrl.searchNews);

module.exports = router;