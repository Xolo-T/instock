/* eslint-disable no-undef */
import React, { Component } from "react";
import './map.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import ReportFormContainer from './report_form_container';

const {
  SearchBox,
} = require("react-google-maps/lib/components/places/SearchBox");
const _ = require("lodash");


const googleMap = require("../../config/keys.js").REACT_APP_GOOGLE_KEY;
const refs = {};

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedReport: null,
      selectedCoords: null,
      reportInputText: "",
      bounds: null,
      center: { lat: 40.672482, lng: -73.968208 },
      markers: [],
    };

    this.updateReport = this.updateReport.bind(this);
    this.centerOnGeolocation = this.centerOnGeolocation.bind(this);
  }

  centerOnGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        this.setState({
          center: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        });
      });
    }
  }

  componentDidMount() {
    this.centerOnGeolocation();
    this.props.fetchReports();
  }

  onMapMounted = (ref) => {
    refs.map = ref;
  };

  //Setting selectedCoords to null closes the report form on submission
  handleReportSubmission = (event) => {
    event.preventDefault();
    this.setState({ selectedCoords: null });
  };

  updateReport = (event) => {
    
    event.preventDefault();
    this.props.updateReport({"id": this.state.selectedReport._id});
    this.setState({
      selectedReport: null
    });

  };

  //Set selected coords when user clicks on open space of map
  onMapClick = (coord) => {
    if (!this.props.isAuthenticated) {
      return;
    }

    let lat = coord.latLng.lat();
    let lng = coord.latLng.lng();

    this.setState({ 
      selectedCoords: { lat: lat, lng: lng },
      selectedReport: null
    });

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: coord.latLng }, function (results, status) {
      if (status === "OK") {
        if (results[0]) {
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  };


  onSearchBoxMounted = (ref) => {
    refs.searchBox = ref;
  };

  onPlacesChanged = () => {

    const places = refs.searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    const nextMarkers = places.map((place) => ({
      position: place.geometry.location,
    }));
    const nextCenter = _.get(nextMarkers, "0.position", this.state.center);

    this.setState({
      selectedReport: null,
      selectedCoords: null,
      center: nextCenter,
      markers: nextMarkers,
    });
  };

  render() {
    const MyMapComponent = withScriptjs(
      withGoogleMap((props) => {  
        return (
          <GoogleMap
            defaultZoom={15}
            onClick={this.onMapClick}
            ref={this.onMapMounted}
            center={this.state.center}
          >
            <div><i className="fas fa-location-arrow geolocation-button" onClick={this.centerOnGeolocation}></i></div>
            {this.state.selectedCoords && (
              <InfoWindow
                
                position={{
                  lat: this.state.selectedCoords.lat,
                  lng: this.state.selectedCoords.lng,
                }}
                onCloseClick={() => {
                  this.setState({
                    selectedCoords: null,
                    reportInputText: ""
                  });
                }}
              >
                <ReportFormContainer
                  lat={this.state.selectedCoords.lat}
                  lng={this.state.selectedCoords.lng}
                  handleReportSubmission={this.handleReportSubmission}
                />
              </InfoWindow>
            )}
            {/* Plots existing reports onto the map */}
            {this.props.reports.map((report) => {
              return (
                <MarkerWithLabel
                  key={report._id}
                  position={{
                    lat: report.lat,
                    lng: report.lng,
                  }}
                  onClick={() => {
                    this.setState({
                      selectedReport: report,
                      selectedCoords: null,
                      center: { lat: report.lat, lng: report.lng }
                    });
                  }}
                  icon={{
                    url: "./toilet-paper.svg",
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                  labelAnchor={new google.maps.Point(-5, 50)}
                >
                  <div className="marker-badge"><i className="far fa-thumbs-up"></i>{report.approvals}</div>
                </MarkerWithLabel>
              );
            })}
            {this.state.selectedReport && (
              <InfoWindow
                position={{
                  lat: this.state.selectedReport.lat,
                  lng: this.state.selectedReport.lng,
                }}
                onCloseClick={() => {
                  this.setState({
                    selectedReport: null
                  });
                }}
              >
                <div>
                  <h2 className="map-report-name">
                    {this.state.selectedReport.storeName}
                  </h2>
                  <p className="map-report-description">
                    {this.state.selectedReport.description}
                  </p>
                  <p>
                    Reported by <strong>{this.state.selectedReport.reporterName}</strong>
                  </p>
                  <p>
                    <button onClick={this.updateReport}><i className="far fa-thumbs-up"></i></button><span className="approvals-count"><strong>{this.state.selectedReport.approvals}</strong></span>
                  </p>
                </div>
              </InfoWindow>
            )}
            <SearchBox
              ref={this.onSearchBoxMounted}
              bounds={this.bounds}
              controlPosition={google.maps.ControlPosition.TOP_LEFT}
              onPlacesChanged={this.onPlacesChanged}
            >
              <input
                type="text"
                placeholder="Find me the TP"
                className="address-searchbar"
              />
            </SearchBox>
            {this.state.markers.map((marker, index) => (
              <Marker key={index} position={marker.position} />
            ))}
        
          </GoogleMap>
        );
      })
    );

    return (
      <div style={{ width: "100vw", height: "50vh" }} className="map-component">
        <MyMapComponent
          isMarkerShown
          googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=" + googleMap}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `65vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <header className="call-to-action">
          <h1>Looking for toilet paper in your neighborhood?</h1>
          <h2>
            Don't waste time traveling from one bodega to another only to come
            up empty-handed.
          </h2>
          <h2>
            Click on one of the pins to find the stores where your neighbors
            have identified toilet paper is in stock.
          </h2>
          <h1>
            Sign up to help notify your neighborhood about what is InStock!
          </h1>
        </header>

        <footer>
          Powered by Petit Pot. Copyright &copy; 2020 Team PuddingHunter.
        </footer>
      </div>
    );
  }
}

export default Map;
