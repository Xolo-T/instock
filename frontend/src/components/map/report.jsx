import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import './report.css';

const Report = ({ report }) => (
  <>
    <MarkerWithLabel
      key={report._id}
      position={{
        lat: report.lat,
        lng: report.lng,
      }}
      onClick={() => {
        // this.setState({
        //   selectedReport: report,
        //   selectedCoords: null
        // });
      }}
      icon={{
        url: "./toilet-paper.svg",
        scaledSize: new window.google.maps.Size(40, 40),
      }}
      labelAnchor={new google.maps.Point(-5, 50)}
    >
      <div className="marker-badge"><i className="far fa-thumbs-up"></i>{report.approvals}</div>
    </MarkerWithLabel>
    <InfoWindow
      position={{
        lat: report.lat,
        lng: report.lng,
      }}
      onCloseClick={() => {
        // this.setState({
        //   selectedReport: null
        // });
      }}
    >
      <div>
        <h2 className="map-report-name">
          {report.storeName}
        </h2>
        <p className="map-report-description">
          {report.description}
        </p>
        <p>
          Reported by <strong>{report.reporterName}</strong>
        </p>
        <p className="instock-verification">
          <span><strong>In stock? </strong></span><button><i className="far fa-thumbs-up"></i></button><button><i className="far fa-thumbs-down"></i></button>
          {/* <span><strong>In stock? </strong></span><button onClick={this.updateReport}><i className="far fa-thumbs-up"></i></button><button><i className="far fa-thumbs-down"></i></button> */}

        </p>
      </div>
    </InfoWindow>
  </>
);

export default Report;