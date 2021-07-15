require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Games = require("./routes/api/Games");

const cors = require("cors");
const auth = require("./routes/api/auth");

//Initialize server
const app = express();

//Select http bodyparser
app.use(express.json());

var corsOptions = {
  origin: "http://localhost:3000",
  headers: ["Content-Type", "Origin", "x-auth-token", "Access"],
};

app.use(cors(corsOptions));

//Configure database
const db = process.env.Database;

//Connect to Database
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected"))
  .then((err) => {
    err ? console.log(err) : "No errors";
  });

//Set route handlers

app.use("/api/jogos", Games);
app.use("/api/auth", auth);

//Setup production assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
//Set port number to enviroment or default
const PORT = process.env.PORT || 5000;

//Configure/test port
app.listen(PORT, () => console.log("Started on PORT " + PORT));
