import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const googleMap = require("../../google_keys_dev").REACT_APP_GOOGLE_KEY;

class Map extends Component {


  
    render() {
        const MyMapComponent = withScriptjs(
          withGoogleMap((props) => (
            <GoogleMap
              defaultZoom={13}
              defaultCenter={{ lat: 40.73061, lng: -73.935242 }}
            >
              {props.isMarkerShown && (
                <Marker position={{ lat: 40.73061, lng: -73.935242 }} />
              )}
            </GoogleMap>
          ))
        );


        
        return (
          <div style={{ width: "100vw", height: "100vh" }}>
            <MyMapComponent
              isMarkerShown
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleMap}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
            ;
          </div>
        ); 
    }
};


      


export default Map; 