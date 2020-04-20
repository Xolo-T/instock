import React from "react"; 

const express = require("express");
const app = express();

const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");

import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
  return <GoogleMap 
    defaultZoom={10} 
    defaultCenter={{ lat: 40.7128, lng: 74.0060 }} />
}

const wrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return <div style={{ width: "25vw", height: "25vh" }}>
    <wrappedMap 
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
      libraries=geometry,drawing,places&key=${
        process.env.REACT_APP_GOOGLE_KEY
      }`} 
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      />
  </div>
}

const users = require("./routes/api/users");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
    // console.log(res);
    res.send("inStock coming very very Soon!");
});

app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server all set ${port}`));
