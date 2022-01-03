var express = require("express");
var passport = require("passport");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
var db = require("../database/db");

var router = express.Router();

/* GET users listing. */
router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

router.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/login");
});

/* GET users listing. */
router.get("/", ensureLoggedIn(), function (req, res, next) {
  db.get(
    "SELECT rowid AS id, username, name FROM users WHERE rowid = ?",
    [req.user.id],
    function (err, row) {
      if (err) {
        return next(err);
      }

      // TODO: Handle undefined row.

      var user = {
        id: row.id.toString(),
        username: row.username,
        displayName: row.name,
      };
      res.render("/", { user: user });
    }
  );
});

module.exports = router;
