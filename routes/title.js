const { getTitle} = require("../controllers/title");
const entryRoute = require("./entry");
const router = require("express").Router();

router.get("/:slug", getTitle);



router.use("/:slug", entryRoute);

module.exports = router;