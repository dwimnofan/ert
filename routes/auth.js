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

// USERS
// CREATE
router.get("/add/:id/:name", function (req, res) {
  db.serialize(() => {
    db.run(
      "INSERT INTO users(id,name) VALUES(?,?)",
      [req.params.id, req.params.name],
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        console.log("New usersloyee has been added");
        res.send(
          "New usersloyee has been added into the database with ID = " +
            req.params.id +
            " and Name = " +
            req.params.name
        );
      }
    );
  });
});

// READ
router.get("/view/:id", function (req, res) {
  db.serialize(() => {
    db.each(
      "SELECT id ID, name NAME FROM users WHERE id =?",
      [req.params.id],
      function (err, row) {
        //db.each() is only one which is funtioning while reading data from the DB
        if (err) {
          res.send("Error encountered while dislaying");
          return console.error(err.message);
        }
        res.send(` ID: ${row.ID},    Name: ${row.NAME}`);
        console.log("Entry dislayed successfully");
      }
    );
  });
});

//UPDATE
router.get("/update/:id/:name", function (req, res) {
  db.serialize(() => {
    db.run(
      "UPDATE users SET name = ? WHERE id = ?",
      [req.params.name, req.params.id],
      function (err) {
        if (err) {
          res.send("Error encountered while updating");
          return console.error(err.message);
        }
        res.send("Entry updated successfully");
        console.log("Entry updated successfully");
      }
    );
  });
});

// DELETE
router.get("/del/:id", function (req, res) {
  db.serialize(() => {
    db.run("DELETE FROM users WHERE id = ?", req.params.id, function (err) {
      if (err) {
        res.send("Error encountered while deleting");
        return console.error(err.message);
      }
      res.send("Entry deleted");
      console.log("Entry deleted");
    });
  });
});

module.exports = router;
