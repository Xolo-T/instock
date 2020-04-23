/* eslint-disable no-undef */
import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import * as reportsData from "./skateboard-parks-copy.json";
import * as dbData from "./tp-parks.json";


const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const googleMap = require("../../config/keys.js").REACT_APP_GOOGLE_KEY;

class Map extends Component {
  constructor() {
    super();

    this.state = {
      selectedReport: null,
      selectedCoords: null,
      reportInputText: "",
    };
  }
  onMapClick = (coord) => {
    let lat = coord.latLng.lat();
    let lng = coord.latLng.lng();

    this.setState({ selectedCoords: { lat: lat, lng: lng } });

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: coord.latLng }, function (results, status) {
      if (status === "OK") {
        if (results[0]) {
          // console.log(results[0]);
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });

    // console.log("The map was clicked");
  };

  handleReportSubmission = (event) => {
    // console.log("handling report submission");
    event.preventDefault();
  };

  handleReportInputChange = (event) => {
    event.preventDefault();
    this.setState({ reportInputText: event.target.value });
  };



  render() {
    const MyMapComponent = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={10}
          // defaultCenter={{ lat: 40.73061, lng: -73.935242 }}
          defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
          onClick={this.onMapClick}
        >
          {this.state.selectedCoords && (
            <InfoWindow
              position={{
                lat: this.state.selectedCoords.lat,
                lng: this.state.selectedCoords.lng,
              }}
            >
              <div>
                <h2>Report Info</h2>
                <input
                  id="report-text-input"
                  value={this.state.reportInputText}
                  onChange={this.handleReportInputChange}
                ></input>
                <button onClick={this.handleReportSubmission}>Submit</button>
              </div>
            </InfoWindow>
          )}

          {dbData.reports.map((report) => (
            <Marker
              key={report._id}
              position={{
                lat: report.lat,
                lng: report.lng,
              }}
              onClick={() => {
                this.setState({
                  selectedReport: report,
                });
              }}
              icon={{
                url: "./inventory.png",
                scaledSize: new window.google.maps.Size(25, 25),
              }}
            />
          ))}

          {this.state.selectedReport && (
            <InfoWindow
              position={{
                lat: this.state.selectedReport.lat,
                lng: this.state.selectedReport.lng,
              }}
            >
              <div>
                <h2>{this.state.selectedReport.name}</h2>
                <h2>{this.state.selectedReport.description}</h2>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ))
    );

    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <MyMapComponent
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleMap}`}
          // googleMapURL={`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=${googleMap}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        ;
      </div>
    );
  }
}

//  {
//    props.isMarkerShown && (
//      <Marker position={{ lat: 40.73061, lng: -73.935242 }} />
//    );
//  }

export default Map;
