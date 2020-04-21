const express = require("express");
const app = express();

const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const reports = require("./routes/api/reports");

const User = require('./models/User')
const bodyParser = require("body-parser");


mongoose
  .connect(db, { useNewUrlParser: true })
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

app.use("/api/reports", reports);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server all set ${port}`));
