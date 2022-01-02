var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/home", function (req, res, next) {
  res.render("index", { user: req.user });
});

router.get("/warga", function (req, res, next) {
  res.render("./warga/index", { user: req.user });
});

router.get("/aspirasi", function (req, res, next) {
  res.render("./warga/aspirasi", { user: req.user });
});

router.get("/edit", function (req, res, next) {
  res.render("./warga/edit", { user: req.user });
});

router.get("/rt", function (req, res, next) {
  res.render("./rt/index", { user: req.user });
});

module.exports = router;
