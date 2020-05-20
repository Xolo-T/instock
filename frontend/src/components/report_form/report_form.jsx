import React, { Component } from "react";
import { InfoWindow } from "react-google-maps";

class ReportForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            reporterId: this.props.currentUser.id,
            reporterName: this.props.currentUser.name,
            vendorPlaceId: this.props.vendorPlaceId,
            vendorName: this.props.vendorName,
            vendorAddress: this.props.vendorAddress,
            vendorPhone: this.props.vendorPhone,
            vendorLat: this.props.vendorLat,
            vendorLng: this.props.vendorLng
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleReportInputChange = this.handleReportInputChange.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.composeReport(this.state);
        this.props.handleReportSubmission(e);
    };

    handleClose = (e) => {
        this.props.handleReportFormClose(e);
    };


    //input changes are handled based on "name" of html element
    handleReportInputChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        this.setState({[name]: e.target.value });
    };

    render(){
        return(
            <InfoWindow

                position={{
                    lat: this.state.vendorLat,
                    lng: this.state.vendorLng,
                }}
                onCloseClick={this.handleClose}
            >
                <div>
                    <h2>Tell us who's got the TP</h2>
                    <p>{this.state.vendorName}</p>
                    <input
                        id="report-text-input"
                        name="vendorName"
                        onChange={this.handleReportInputChange}
                        placeholder="Edit vendor name"
                    ></input>
                    <p>{this.state.vendorAddress}</p>
                    <a href={"tel:+1" + this.state.vendorPhone}>{this.state.vendorPhone}</a>
                    <p>{this.state.vendorStatus}</p>
                    <p><strong>In stock?</strong></p>
                    <button onClick={this.handleSubmit}>Yup!</button>
                </div>
            </InfoWindow>
        )
    }
}

export default ReportForm;
