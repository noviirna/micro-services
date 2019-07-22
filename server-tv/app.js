require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT_TV || 3002;

const morgan = require("morgan");
const mongoose = require("mongoose");

const routes = require("./routes/index");
const errHandler = require("./helpers/errHandler");

const cors = require("cors");
app.use(cors());

app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);
app.use(errHandler);

let DB_PATH = "";
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  DB_PATH = process.env.MONGODB_LOCAL;
} else {
  DB_PATH = process.env.MONGODB_URL;
}

mongoose
  .connect(DB_PATH, { useNewUrlParser: true })
  .then(connected => {
    console.log("connected to", DB_PATH);
  })
  .catch(errors => {
    console.log(JSON.stringify(errors, null, 2));
  });

if (process.env.NODE_ENV === "test") {
  module.exports = app;
} else {
  app.listen(port, () => {
    console.log("on environment =>", process.env.NODE_ENV);
    console.log("listening to :", port);
  });
}

/** 
  npm init -y
  npm install mongoose express dotenv bcryptjs jsonwebtoken cors morgan --save
  npm install axios --save
  npm install google-auth-library --save
  npm install @google-cloud/storage multer --save
*/
