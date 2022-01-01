var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("./index", { title: "E-RT" });
});

router.get("/login", function (req, res, next) {
  res.render("./login", { title: "Login" });
});

router.get("/warga", function (req, res, next) {
  res.render("./warga/index", { title: "Kelola Warga" });
});

router.get("/aspirasi", function (req, res, next) {
  res.render("./warga/aspirasi", { title: "Semua Aspirasi" });
});

router.get("/rt", function (req, res, next) {
  res.render("./rt/index", { title: "Kelola RT" });
});

module.exports = router;
