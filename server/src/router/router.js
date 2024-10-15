const express = require("express");
const db = require("../configs/db.js");
const upload = require("../configs/multer.js");

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
          req.session.user = user;
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

router.get("/log", (req, res) => {
  if (req.session.user) {
    res.json({ log: true });
  } else {
    res.json({ log: false });
  }
});

router.get("/", (req, res) => {
  if (req.session.user) {
    const rq = "SELECT * FROM links WHERE user_id = ?";
    db.query(rq, [req.session.user.id], (err, data) => {
      if (err) return res.json({ err });
      res.json({ log: true, user: req.session.user, links: data });
    });
  } else {
    res.json({ log: false });
  }
});

router.post("/add", (req, res) => {
  const { title, url, description } = req.body;
  const rq = "INSERT INTO links (user_id, title, link, description) VALUES (?)";
  db.query(
    rq,
    [[req.session.user.id, title, url, description]],
    (err, data) => {
      if (err) return res.json({ err });
      res.sendStatus(204);
    }
  );
});

router.post("/del", (req, res) => {
  const { id } = req.body;
  const rq = "DELETE FROM links WHERE id = ?";
  db.query(rq, [id], (err, data) => {
    if (err) return res.json({ err });
    res.sendStatus(204);
  });
});

router.post("/getid", (req, res) => {
  const { id } = req.body;
  if (req.session.user) {
    const rq = "SELECT * FROM links WHERE id = ?";
    db.query(rq, [id], (err, data) => {
      if (err) return res.json(err);
      res.json({ log: true, data });
    });
  } else {
    res.json({ log: false });
  }
});

router.put("/edit", (req, res) => {
  const { id, title, url, description } = req.body;
  const rq =
    "UPDATE links SET title = ?, link = ?, description = ? WHERE id = ?";
  db.query(rq, [title, url, description, id], (err, data) => {
    if (err) return res.json({ err });
    res.sendStatus(204);
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.sendStatus(204);
});

router.delete("/del/:id", (req, res) => {
  const id = req.params.id;
  const rq = "DELETE FROM users WHERE id = ?";
  db.query(rq, [id], (err, data) => {
    if (err) return res.json({ err });
    req.session.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;
