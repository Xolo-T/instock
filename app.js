
const express = require("express");
const app = express();

const db = require("./frontend/src/config/keys").mongoURI;
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const reports = require("./routes/api/reports");
const approvals = require("./routes/api/approvals");

const User = require('./models/User')
const bodyParser = require("body-parser");

const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const passport = require('passport');
app.use(passport.initialize());

require('./frontend/src/config/passport')(passport);

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })

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
app.use("/api/reports", reports);
app.use("/api/approvals", approvals);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server all set ${port}`));
