const { getAllUsers,blockUser,unblockUser, hideEntry,hideTitle} = require("../controllers/admin");
const { getAccessToRoute, getAdminAccess, } = require("../middlewares/authorization/authorization");
const { isUserExists, isTitleExists, isEntryExistsInTitle } = require("../middlewares/database/queryHelpers");

const router = require("express").Router();

router.get("/users", [getAccessToRoute,getAdminAccess], getAllUsers);
router.get("/block/:user_id", [isUserExists,getAccessToRoute, getAdminAccess], blockUser);
router.get("/unblock/:user_id", [isUserExists ,getAccessToRoute, getAdminAccess], unblockUser);
router.get("/hide-title/:slug", [isTitleExists,getAccessToRoute, getAdminAccess], hideTitle);
router.get("/hide-entry/:slug/:entry_id", [isEntryExistsInTitle,getAccessToRoute, getAdminAccess], hideEntry);



module.exports = router;

