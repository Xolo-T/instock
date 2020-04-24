/* eslint-disable no-undef */
import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
// import * as reportsData from "./skateboard-parks-copy.json";
import * as dbData from "./tp-parks.json";
import MapFormContainer from './map_form_container'


// const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const googleMap = require("../../config/keys.js").REACT_APP_GOOGLE_KEY;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedReport: null,
      selectedCoords: null,
      reportInputText: "",
    };
  }

  componentDidMount(){
    this.props.fetchReports()
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
    // event.preventDefault();
    this.setState({ reportInputText: event.target.value });
  };



  render() {
    
    const MyMapComponent = withScriptjs(
      withGoogleMap((props) => {
        
        return(
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
              <MapFormContainer
                lat={this.state.selectedCoords.lat}
                lng={this.state.selectedCoords.lng}
              />
            </InfoWindow>
          )}

          {/* {
              useEffect(() => {
                if (news.length < 1) {
                  search();
                  $.ajax('/api/news/new').done(res => {
                    setNews(news.concat(res.articles));
                  });
                }
              });
          } */}

          {this.props.reports.map((report) => {
            debugger
            return(
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
                url: "./toilet-paper.svg",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />)
            })}

          {this.state.selectedReport && (
            <InfoWindow
              position={{
                lat: this.state.selectedReport.lat,
                lng: this.state.selectedReport.lng,
              }}
            >
              <div>
                <h2 className="map-report-name">{this.state.selectedReport.name}</h2>
                <p className="map-report-description">{this.state.selectedReport.description}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )})
    );

    return (
      <div style={{ width: "100vw", height: "50vh" }} className="map-component">
        <MyMapComponent
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleMap}`}
          // googleMapURL={`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=${googleMap}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <header className="call-to-action">
          <h1>Looking for toilet paper in your neighborhood?</h1>
          <h2>Don't waste time traveling from one bodega to another only to come up empty-handed.</h2>
          <h2>Click on one of the pins to find the stores where your neighbors have identified toilet paper is in stock.</h2>
          <h1>Sign up to help notify your neighborhood about what is InStock!</h1>
        </header>
        <footer>Powered by Petit Pot. Copyright &copy; 2020 Team PuddingHunter.</footer>
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
