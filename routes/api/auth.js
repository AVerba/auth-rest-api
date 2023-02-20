const express = require("express");

const ctrl = require(`../../controllers/auth`);

const { ctrlWrapper } = require(`../../helpers`);

const { auth } = require(`../../middlewares`);

const router = express.Router();

// sign up
router.post("/register", ctrlWrapper(ctrl.register));

// sign in
router.post("/login", ctrlWrapper(ctrl.login));

// current
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

// log out
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
// google authorization
router.get("/google", ctrlWrapper(ctrl.googleAuth));

router.get("/google-redirect", ctrlWrapper(ctrl.googleRedirect));



module.exports = router;
