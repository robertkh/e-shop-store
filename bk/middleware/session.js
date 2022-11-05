// todo
const session = require("express-session");
const MongoStore = require("connect-mongo");
const uri = process.env.MONGO_URI;

// todo
const sess = {
  secret: "keyboard cat",
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored (true -> create)
  store: new MongoStore({
    mongoUrl: uri,
  }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000,
  },
};

// todo
module.exports = session(sess);
