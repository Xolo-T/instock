import React, { Component } from "react";

class ReportForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            reporterId: this.props.currentUser.id,
            reporterName: this.props.currentUser.name,
            storeName: "",
            lng: this.props.lng,
            lat: this.props.lat,
        };

        this.handleReportInputChange = this.handleReportInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        debugger
        this.props.composeReport(this.state);
        this.props.handleReportSubmission(event);
    };

    handleReportInputChange = (event) => {
        event.preventDefault();
        this.setState({ storeName: event.target.value });
    };

    render(){

        return(
            <div>
                <h2>Tell us who's got the TP</h2>
                <input
                    id="report-text-input"
                    value={this.state.storeName}
                    onChange={this.handleReportInputChange}
                ></input>
                <button onClick={this.handleSubmit}>Submit</button>
            </div> 
        )
    }
}

export default ReportForm;