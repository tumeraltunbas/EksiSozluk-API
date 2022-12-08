const { createEntry } = require("../controllers/entry");
const { hideTitle,visibleTitle,searchTitle,followTitle} = require("../controllers/title");
const { getAccessToRoute, getAdminAccess } = require("../middlewares/authorization/authorization");
const { isTitleExists, isTitleOpened } = require("../middlewares/database/queryHelpers");
const entryRoute = require("./entry");
const router = require("express").Router();

router.get("/search", searchTitle);
router.get("/:slug/hide",[isTitleExists,getAccessToRoute, getAdminAccess], hideTitle);
router.get("/:slug/visible", [isTitleExists, getAccessToRoute, getAdminAccess], visibleTitle);
router.get("/:slug/follow", [getAccessToRoute, isTitleExists], followTitle);
router.use("/:slug", entryRoute); //use entry route
router.post("/entry",[getAccessToRoute, isTitleOpened] , createEntry); //creating an entry route

module.exports = router;