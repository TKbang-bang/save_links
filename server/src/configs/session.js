const session = require("express-session");
const MySeession = require("express-mysql-session")(session);

const sessionStore = new MySeession({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "soytk",
  database: "users_db",
});

module.exports = sessionStore;
