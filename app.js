
const express = require("express");
const app = express();

const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");

const users = require("./routes/api/users");

const User = require('./models/User')
const bodyParser = require("body-parser");

require("dotenv").config(); 

const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ 
    extended: false 
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
    // const user = new User({
    //     userName: 'dev',
    //     email: 'dev@email.com',
    //     password: 'password'
    // })
    // user.save();
    res.send("inStock coming very very Soon!");
});

app.use("/api/users", users);

// console.log(REACT_APP_GOOGLE_KEY) 

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server all set ${port}`));
