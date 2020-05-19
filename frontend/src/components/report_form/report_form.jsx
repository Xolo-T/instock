import React, { Component } from "react";

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
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.composeReport(this.state);
        this.props.handleReportSubmission(event);
    };

    render(){

        return(
            <div>
                <h2>Tell us who's got the TP</h2>
                <p>{this.props.vendorName}</p>
                <p>{this.props.vendorAddress}</p>
                <a href={"tel:+1" + this.props.vendorPhone}>{this.props.vendorPhone}</a>
                <p>{this.props.vendorStatus}</p>
                <p><strong>In stock?</strong></p>
                <button onClick={this.handleSubmit}>Yup!</button>
            </div>
        )
    }
}

export default ReportForm;