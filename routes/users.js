const express = require("express");
const passport = require("passport");

const {
  register,
  login,
  getUser,
  forgotPassword,
  reset,
  editUser,
  changeAvatar,
  changeEmail,
  deleteUser,
  changePassword
} = require("../controllers/users");
const {
  verifyChangeEmail,
  verifyEmail
} = require("../controllers/verification");
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
  passport.authenticate("jwt", { session: false }),
  getUser
);

router.put("/edit", passport.authenticate("jwt", { session: false }), editUser);
router.post(
  "/email",
  passport.authenticate("jwt", { session: false }),
  changeEmail
);
router.put(
  "/password",
  passport.authenticate("jwt", { session: false }),
  changePassword
);
router.put("/verifyEmail", verifyChangeEmail);

router.post("/forgot", forgotPassword);
router.post("/reset/:token", reset);
router.post("/verification", verifyEmail);

router.delete(
  "/deleteUser",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

module.exports = router;
