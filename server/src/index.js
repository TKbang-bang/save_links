const express = require("express");
const router = require("./router/router");
const cors = require("cors");
const session = require("express-session");
const sessionStore = require("./configs/session.js");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    key: "myusersended",
    secret: `${crypto.randomUUID(20)}`,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname, "../images")));

app.use(router);

app.listen(app.get("port"), () => console.log("Server on"));
