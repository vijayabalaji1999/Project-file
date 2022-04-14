const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userroute = require("./router/userroute");
const globalErrorHandler = require("./controller/errorController");
const adminrouter = require("./router/adminroute");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

app.use(express.json());
dotenv.config({ path: "./config.env" });
app.use(cookieParser());

app.use(
 cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
 })
);

app.use(bodyParser.urlencoded({ extended: false }));

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

let store = new MongoDBStore({
 uri: DB,
 collection: "mySessions",
 expires: 1000 * 60 * 60 * 24 * 30,
});

app.use(
 session({
  key: "userId",
  secret: "subscribe",
  resave: false,
  saveUninitialized: false,
  cookie: {
   maxAge: 1000 * 60 * 60 * 24 * 7,
   secure: false,
  },
  store: store,
 })
);

app.get("/user/sessions", (req, res) => {
 if (req.session.user) {
  res.send({ loggedIn: true, user: req.session.user });
 } else {
  res.send({ loggedIn: false });
 }
});

app.use("/images", express.static(`../react-app/public`));

app.use("/api/admin", adminrouter);

app.use("/api/user", userroute);

const port = 3001;
app.listen(port, () => {
 console.log(`App running on port ${port}...`);
});

app.use(globalErrorHandler);
