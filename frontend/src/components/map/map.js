import React, { Component } from "react";
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import {withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends Component {


  
    render() {
        // const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        //     <GoogleMap
        //         defaultZoom={8}
        //         defaultCenter={{ lat: -34.397, lng: 150.644 }}
        //     >
        //         {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
        //     </GoogleMap>
        // ))

        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
                defaultZoom={13}
            >
            </GoogleMap>
        ));

        
        return (   
        
            <div>
                <GoogleMapExample
                    containerElement={<div style={{ height: `500px`, width: '500px' }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        ); 
    }
};

// <MyMapComponent
// isMarkerShown
// googleMapURL = {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
// loadingElement = {<div style={{ height: `100%` }} />}
// containerElement = {<div style={{ height: `400px` }} />}
// mapElement = {< div style = {{ height: `100%` }} />}
// />;



export default Map; 