/* eslint-disable no-undef */
import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
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
  }

  componentDidMount() {
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

  onMapClick = (coord) => {
    let lat = coord.latLng.lat();
    let lng = coord.latLng.lng();

    this.setState({ selectedCoords: { lat: lat, lng: lng } });

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: coord.latLng }, function (results, status) {
      if (status === "OK") {
        if (results[0]) {
          console.log(results[0].place_id);
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
            {this.props.reports.map((report) => {
              return (
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
                />
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
                    selectedReport: null,
                    selectedCoords: null
                  });
                }}
              >
                <div>
                  <h2 className="map-report-name">
                    {this.state.selectedReport.name}
                  </h2>
                  <p className="map-report-description">
                    {this.state.selectedReport.description}
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
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `240px`,
                  height: `40px`,
                  marginTop: `10px`,
                  padding: `0 12px`,
                  borderRadius: `4px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`
                }}
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
