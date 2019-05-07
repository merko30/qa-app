const express = require("express");
const passport = require("passport");

const {
  register,
  login,
  getUser,
  forgotPassword,
  reset,
  editUser,
  changeAvatar
} = require("../controllers/users");
const upload = require("../config/multer");

const router = express.Router();

router.post("/register", upload.single("avatar"), register);
router.patch(
  "/avatar",
  [passport.authenticate("jwt", { session: false }), upload.single("avatar")],
  changeAvatar
);

router.post("/login", login);

router.get(
  "/user/:id",
  [passport.authenticate("jwt", { session: false })],
  getUser
);

router.put("/edit", passport.authenticate("jwt", { session: false }), editUser);

router.post("/forgot", forgotPassword);
router.post("/reset/:token", reset);

module.exports = router;
