const { getAccessToRoute,getEntryOwnerAccess } = require("../middlewares/authorization/authorization");
const { isTitleOpened, isEntryExistsInTitle } = require("../middlewares/database/queryHelpers");
const router = require("express").Router({mergeParams:true});
const {createEntry,likeEntry,dislikeEntry,undoLikeEntry,undoDislikeEntry,editEntry,favoriteEntry} = require("../controllers/entry");

router.post("/entry",[getAccessToRoute, isTitleOpened] , createEntry);
router.get("/:entry_id/like", [getAccessToRoute, isEntryExistsInTitle], likeEntry);
router.get("/:entry_id/undolike", [getAccessToRoute, isEntryExistsInTitle], undoLikeEntry);
router.get("/:entry_id/dislike", [getAccessToRoute, isEntryExistsInTitle], dislikeEntry);
router.get("/:entry_id/undodislike", [getAccessToRoute, isEntryExistsInTitle], undoDislikeEntry);
router.put("/:entry_id/edit", [getAccessToRoute, isEntryExistsInTitle, getEntryOwnerAccess], editEntry);
router.get("/:entry_id/favorite", [getAccessToRoute, isEntryExistsInTitle], favoriteEntry);

module.exports = router;