"use strict";
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

class Session {
  constructor() {
    this.options = {
      host: "localhost",
      port: 3306,
      user: { ENV: "DB_USER" },
      password: { ENV: "DB_PASSWORD" },
      database: { ENV: "DB_DATABASENAME" },
    };

    for (let key in this.options) {
      if (this.options[key].ENV != undefined) {
        this.options[key] = process.env[this.options[key].ENV];
      }
    }

    let sessionStore = new MySQLStore(this.options);

    let sess = {
      key: "session_cookie_name",
      store: sessionStore,
      secret: "__pvsystem__",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 5 * 60 * 1000 }, // 5 minutes
    };

    // if (process.env.NODE_ENV === 'production') {
    //   app.set('trust proxy', 1); // trust first proxy
    //   sess.cookie.secure = true; // serve secure cookies
    // }

    this._session = session(sess);
  }
}

module.exports = new Session()._session;
