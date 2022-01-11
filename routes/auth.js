var express = require("express");
var passport = require("passport");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
var db = require("../database/db");

var router = express.Router();

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

router.get("/", ensureLoggedIn(), function (req, res, next) {
  db.get("SELECT username FROM users", [], (err, row) => {
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
  });
});

module.exports = router;
