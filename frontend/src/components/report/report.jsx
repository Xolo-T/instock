import React, { Component } from "react";
import { InfoWindow } from "react-google-maps";
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import './report.css';

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedReport: false,
      minutesSinceReported: this.minutesSinceReported()
    };

    this.updateReport = this.updateReport.bind(this);
  }

  minutesSinceReported = () => {
    // Milliseconds elapsed since the UNIX epoch 
    const currentDateTime = Date.now();
    const reportDateTime = Date.parse(this.props.report.date);
    // Diff in minutes
    const diff = Math.floor((currentDateTime - reportDateTime) / 1000 / 60);

    if (diff < 60) {
      return `${diff} minutes ago`;
    } else if (diff < 120) {
      return `about ${Math.floor(diff/60)} hour ago`;
    } else if (diff <= 4320) {
      return `about ${Math.floor(diff / 60)} hours ago`;
    } else {
      return `over 72 hours ago`
    }
  };

  updateReport = (e) => {
    e.preventDefault();
    this.props.updateReport({ "id": this.props.report._id });
  };

  render () {
    const { report, icon, labelAnchor } = this.props;

    return (
      <>
        <MarkerWithLabel
          position={{
            lat: report.lat,
            lng: report.lng,
          }}
          onClick={() => {
            debugger
            this.setState({
              selectedReport: true
            });
          }}
          icon={icon}
          labelAnchor={labelAnchor}
        >
          <div className="marker-badge"><i className="far fa-thumbs-up"></i>{report.approvals}</div>
        </MarkerWithLabel>
        {this.state.selectedReport && (<InfoWindow
          position={{
            lat: report.lat,
            lng: report.lng,
          }}
          onCloseClick={() => {
            this.setState({
              selectedReport: false
            });
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
            <p>
              Reported <strong>{this.state.minutesSinceReported}</strong>
            </p>
            <p className="instock-verification">
              <span><strong>In stock? </strong></span><button onClick={this.updateReport}><i className="far fa-thumbs-up"></i></button><button><i className="far fa-thumbs-down"></i></button>
            </p>
          </div>
        </InfoWindow>)}
      </>
    );
  }
}

export default Report;