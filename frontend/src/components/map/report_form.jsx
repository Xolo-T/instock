import React, { Component } from "react";

class ReportForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            reporterId: this.props.currentUser,
            // placeId: "Not place",
            // productType: "tp",
            // placeId: this.props.placeId,
            name: "",
            // description: this.props.description,
            lng: this.props.lng,
            lat: this.props.lat,
        };

        this.handleReportInputChange = this.handleReportInputChange.bind(this);
        this.handleReportSubmission = this.handleReportSubmission.bind(this);
    }

    handleReportSubmission = (event) => {
        debugger
        event.preventDefault();
        this.props.composeReport(this.state)
    };

    handleReportInputChange = (event) => {
        event.preventDefault();
        this.setState({ name: event.target.value });
    };

    render(){

        return(
            <div>
                <h2>Submit store name</h2>
                <input
                    id="report-text-input"
                    value={this.state.name}
                    onChange={this.handleReportInputChange}
                ></input>
                <button onClick={this.handleReportSubmission}>Submit</button>
            </div> 
        )
    }
}

export default ReportForm;