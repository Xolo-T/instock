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
import ReportFormContainer from '../report_form/report_form_container';
import ReportContainer from '../report/report_container';

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
      selectedCoords: null,
      reportInputText: "",
      bounds: null,
      center: { lat: 40.672482, lng: -73.968208 },
      markers: [],
      timeFilter: Infinity,
      selectedVendor: null
    };

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
    this.setState({ selectedVendor: null });
  };


  onSearchBoxMounted = (ref) => {
    refs.searchBox = ref;
  };

  onPlacesChanged = () => {

    const places = refs.searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      debugger
      this.setState({
        selectedVendor: place
      });
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
    });
  };

  handleTimeFilter = (e) => {
    e.preventDefault();
    this.setState ({
      timeFilter: e.target.value
    });
  };

  render() {
    const MyMapComponent = withScriptjs(
      withGoogleMap((props) => {  
        return (
          <GoogleMap
            defaultZoom={15}
            // onClick={this.onMapClick}
            ref={this.onMapMounted}
            center={this.state.center}
          >
            <div className="time-filter-container">
              <label htmlFor="time-filter">Filter by date reported</label>
              <select id="time-filter" onChange={this.handleTimeFilter} value={this.state.timeFilter}>
                  <option value="Infinity">All time</option>
                  <option value="24">Past 24 hours </option>
                  <option value="48">Past 2 days</option>
                  <option value="72">Past 3 days</option>
                  <option value="168">Past week</option>
                  <option value="336">Past two weeks</option>
                </select>
            </div>
            <div><i className="fas fa-location-arrow geolocation-button" onClick={this.centerOnGeolocation}></i></div>
            {this.state.selectedVendor && (
              <InfoWindow
                
                position={{
                  lat: this.state.selectedVendor.geometry.location.lat(),
                  lng: this.state.selectedVendor.geometry.location.lng(),
                }}
                onCloseClick={() => {
                  this.setState({
                    selectedVendor: null
                    // selectedCoords: null,
                    // reportInputText: ""
                  });
                }}
              >
                <ReportFormContainer
                  vendorPlaceId={this.state.selectedVendor.place_id}
                  vendorName={this.state.selectedVendor.name}
                  vendorAddress={this.state.selectedVendor.formatted_address}
                  vendorPhone={this.state.selectedVendor.formatted_phone_number}
                  vendorStatus={this.state.selectedVendor.business_status}
                  vendorLat={this.state.selectedVendor.geometry.location.lat()}
                  vendorLng={this.state.selectedVendor.geometry.location.lng()}
                  lat={this.state.selectedVendor.geometry.location.lat()}
                  lng={this.state.selectedVendor.geometry.location.lng()}
                  handleReportSubmission={this.handleReportSubmission}
                />
              </InfoWindow>
            )}
            {/* Plots existing reports onto the map */}
            {this.props.reports.map((report) => {
              // Milliseconds elapsed since the UNIX epoch represented as integer
              const currentDateTime = Date.now();
              const reportDateTime = Date.parse(report.date);
              // millisecondsDiff / 1000 => seconds; seconds / 60 => minutes; minutes / 60 => hours
              const millisecondsDiff = Math.floor((currentDateTime - reportDateTime) / 1000 / 60 / 60);
              if (millisecondsDiff <= this.state.timeFilter) {
                return (
                  <ReportContainer
                    key={report._id}
                    report = {report}
                    icon= {{
                      url: "./toilet-paper.svg",
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}
                    labelAnchor={new window.google.maps.Point(-5, 50)}
                  />
                );
              }
              })}
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
