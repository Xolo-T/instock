import React, { Component } from "react";
import { InfoWindow } from "react-google-maps";
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import './report.css';

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedReport: false
    };

    this.updateReport = this.updateReport.bind(this);
  }

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