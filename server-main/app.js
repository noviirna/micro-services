require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const morgan = require("morgan");

const routes = require("./routes/index");

const cors = require("cors");
app.use(cors());

app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

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
