var express = require("express");
var router = express.Router();
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

/* GET home page. */
router.get("/", ensureLoggedIn('/login'), function (req, res, next) {
  res.render("index", { user: req.user });
});

router.get("/warga", ensureLoggedIn('/login'),function (req, res, next) {
  res.render("./warga/index", { user: req.user });
});

router.get("/aspirasi", ensureLoggedIn('/login'),function (req, res, next) {
  res.render("./warga/aspirasi", { user: req.user });
});

router.get("/edit", ensureLoggedIn('/login'),function (req, res, next) {
  res.render("./warga/edit", { user: req.user });
});

router.get("/rt", ensureLoggedIn('/login'),function (req, res, next) {
  res.render("./rt/index", { user: req.user });
});

module.exports = router;
