var express = require("express");
var router = express.Router();
var db = require("../database/db");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

// home hanya bisa diakses jika sudah login, ensureLoggedIn --> secara default akan mengarahkan ke /login apabila user belum login
router.get("/home", ensureLoggedIn(), function (req, res, next) {
  res.render("index", { user: req.user });
});
// root handler
router.get("/", function (req, res, next) {
  res.redirect("/home");
});

//view warga
router.get("/warga", ensureLoggedIn(), function (req, res, next) {
  const sql = "SELECT * FROM warga ORDER BY nama";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("warga", { model: rows });
  });
});

// CRUD WARGA
router.get("/editWarga/:id", ensureLoggedIn(), function (req, res, next) {
  const id = req.params.id;
  const sql = "SELECT * FROM warga WHERE id=?";
  db.get(sql, id, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.render("editWarga", { model: row });
  });
});

router.post("/editWarga/:id", ensureLoggedIn(), function (req, res, next) {
  const id = req.params.id;
  const warga = [
    req.body.nama,
    req.body.nik,
    req.body.tanggallahir,
    req.body.kelamin,
    req.body.agama,
    id,
  ];
  const sql =
    "UPDATE warga SET nama=?, nik=?, tanggallahir=?, kelamin=?, agama=? WHERE (id = ?)";
  db.run(sql, warga, (err) => {
    if (err) {
      console.error(err.message);
    }
    res.redirect("/warga");
  });
});

router.get("/addWarga", ensureLoggedIn(), function (req, res, next) {
  res.render("addWarga", { model: {} });
});

router.post("/addWarga", ensureLoggedIn(), function (req, res, next) {
  const warga = [
    req.body.nama,
    req.body.nik,
    req.body.tanggallahir,
    req.body.kelamin,
    req.body.agama,
  ];
  const sql =
    "INSERT INTO warga (nama, nik, tanggallahir, kelamin, agama) VALUES (?, ?, ?, ?, ?)";
  db.run(sql, warga, (err) => {
    if (err) {
      console.error(err.message);
    }
    res.redirect("/warga");
  });
});

router.get("/deleteWarga/:id", ensureLoggedIn(), function (req, res, next) {
  const id = req.params.id;
  const sql = "SELECT * FROM warga WHERE id=?";
  db.get(sql, id, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.render("deleteWarga", { model: row });
  });
});

router.post("/deleteWarga/:id", ensureLoggedIn(), function (req, res, next) {
  const id = req.params.id;
  const sql = "DELETE FROM warga WHERE id=?";
  db.run(sql, id, (err) => {
    if (err) {
      console.error(err.message);
    }
    res.redirect("/warga");
  });
});

/*
search warga dengan nama/nik di mysql bisa berfungsi (berbeda dengan sqlite karena syntaxnya berbeda)
router.post("/warga", function (req, res) {
  let searchTerm = req.body.search;
  // User the connection
  db.query(
    "SELECT * FROM warga WHERE NIK LIKE ? OR Nama LIKE ?",
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        res.render("warga", { warga: rows });
      } else {
        console.log(err);
      }
    }
  );
}); 
*/
//search warga -- ERROR, tidak berfungsi
router.get("/cariWarga", ensureLoggedIn(), function (req, res, next) {
  let searchTerm = req.body.search;
  const sql = "SELECT * FROM warga WHERE nik LIKE ? OR nama LIKE ?";
  db.all(sql, ["%" + searchTerm + "%", "%" + searchTerm + "%"], (err, rows) => {
    if (!err) {
      res.render("cariWarga", { warga: rows });
    } else {
      console.log(err);
    }
  });
});

router.post("/cariWarga", ensureLoggedIn(), function (req, res, next) {
  const sql = "SELECT * FROM warga ORDER BY id";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("cariWarga", { model: rows });
  });
});

// CRUD RT
router.get("/rt", ensureLoggedIn(), function (req, res, next) {
  const sql = "SELECT * FROM struktur_rt ORDER BY id";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("rt", { model: rows });
  });
});

router.get("/editRt/:id", ensureLoggedIn(), function (req, res, next) {
  const id = req.params.id;
  const sql = "SELECT * FROM struktur_rt WHERE id=?";
  db.get(sql, id, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.render("editRt", { model: row });
  });
});

router.post("/editRt/:id", ensureLoggedIn(), function (req, res, next) {
  const id = req.params.id;
  const rt = [req.body.nama, req.body.jabatan, id];
  const sql = "UPDATE struktur_rt SET nama=?, jabatan=? WHERE (id = ?)";
  db.run(sql, rt, (err) => {
    if (err) {
      console.error(err.message);
    }
    res.redirect("/rt");
  });
});

router.get("/addRt", ensureLoggedIn(), function (req, res, next) {
  res.render("addRt", { model: {} });
});

router.post("/addRt", ensureLoggedIn(), function (req, res, next) {
  const rt = [req.body.nama, req.body.jabatan];
  const sql = "INSERT INTO struktur_rt (nama, jabatan) VALUES (?, ?)";
  db.run(sql, rt, (err) => {
    if (err) {
      console.error(err.message);
    }
    res.redirect("/rt");
  });
});

router.get("/deleteRt/:id", ensureLoggedIn(), function (req, res, next) {
  const id = req.params.id;
  const sql = "SELECT * FROM struktur_rt WHERE id=?";
  db.get(sql, id, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.render("deleteRt", { model: row });
  });
});

router.post("/deleteRt/:id", ensureLoggedIn(), function (req, res, next) {
  const id = req.params.id;
  const sql = "DELETE FROM struktur_rt WHERE id=?";
  db.run(sql, id, (err) => {
    if (err) {
      console.error(err.message);
    }
    res.redirect("/rt");
  });
});

module.exports = router;
