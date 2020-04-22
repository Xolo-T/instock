import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as parksData from "./skateboard-parks.json";

const googleMap = require("../../google_keys_dev").REACT_APP_GOOGLE_KEY;

class Map extends Component {
  constructor() {
    super(); 

  this.state = {
    selectedPark: null
    }
  }

// changeMessage() {
//   this.setState({
//     selectedPark: park
//   })
// }
  
    render() {
        const MyMapComponent = withScriptjs(
          withGoogleMap((props) => (
            <GoogleMap
              defaultZoom={10}
              // defaultCenter={{ lat: 40.73061, lng: -73.935242 }}
              defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
            >
           {parksData.features.map((park) => (
             <Marker key={park.properties.PARK_ID} position={{
               lat: park.geometry.coordinates[1],
               lng: park.geometry.coordinates[0]}} 

              onClick={() => {
                // this.state.selectedPark(park); 
                // this.changeMessage() 
                  this.setState({
                    selectedPark: park
                  })    
              }} 

              // icon={{
              //   url: "./skateboard.jpeg",
              //   scaledSize: new window.google.maps.Size(25, 25)
              // }}
               />
           ))}

           {this.state.selectedPark && (
                <InfoWindow
                position={{
               lat: this.state.selectedPark.geometry.coordinates[1],
               lng: this.state.selectedPark.geometry.coordinates[0]}} 
                >
                <div>
                <h2>{this.state.selectedPark.properties.NAME}</h2>
                <h2>{this.state.selectedPark.properties.DESCRIPTIO}</h2>
              
                
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
};


        //  {
        //    props.isMarkerShown && (
        //      <Marker position={{ lat: 40.73061, lng: -73.935242 }} />
        //    );
        //  }


export default Map; 