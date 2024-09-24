const express = require("express");
const db = require("../configs/db.js");

const router = express.Router();

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const rq = "SELECT * FROM users WHERE email = ?";
  db.query(rq, [email], (err, data) => {
    if (err) return res.json({ err });
    if (data.length > 0) {
      res.json({ ok: false, message: "!Cuenta ya existente*" });
    } else {
      const rq2 = "INSERT INTO users (name, email) values (?)";
      db.query(rq2, [[name, email]], (err2, data2) => {
        if (err2) return res.json({ err2 });
        const rq3 = "SELECT id FROM users WHERE name = ?";
        db.query(rq3, [name], (err3, data3) => {
          if (err3) return res.json({ err3 });
          const id = data3[0].id;
          const rq4 = "INSERT INTO passwords (user_id, password) VALUES (?)";
          db.query(rq4, [[id, password]], (err4, data4) => {
            if (err4) return res.json({ err4 });
            return res.json({ ok: true });
          });
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const rq = "SELECT * FROM users WHERE email = ?";
  db.query(rq, [email], (err, data) => {
    if (err) return res.json({ err });
    if (data.length > 0) {
      const user = data[0];
      const rq2 = "SELECT * FROM passwords WHERE password = ?";
      db.query(rq2, [password], (err2, data2) => {
        if (err2) return res.json({ err2 });
        if (data2.length > 0) {
          req.session.user = data;
          res.json({ ok: true });
        } else {
          res.json({ ok: false, message: "!Contraseña equivocada*" });
        }
      });
    } else {
      res.json({ ok: false, message: "!Cuenta inexistente*" });
    }
  });
});

router.get("/", (req, res) => {
  res.send(req.session.user);
});

module.exports = router;
