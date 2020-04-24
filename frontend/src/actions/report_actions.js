import * as APIUtil from '../util/report_api_util';

export const RECEIVE_REPORTS = "RECEIVE_REPORTS";
export const RECEIVE_REPORT = "RECEIVE_REPORT";

export const receiveReports = reports => ({
    type: RECEIVE_REPORTS,
    reports
});

export const receiveReport = report => ({
    type: RECEIVE_REPORT,
    report
});

export const fetchReports = () => dispatch => (
    APIUtil.getReports()
        .then(reports => dispatch(receiveReports(reports)))
        // .catch(err => console.log(err))
);

export const fetchPlaceReports = placeId => dispatch => (
    APIUtil.getPlaceReports(placeId)
        .then(reports => dispatch(receiveReports(reports)))
        // .catch(err => console.log(err))
);

export const fetchReport = report => dispatch => (
    APIUtil.getReport(report)
        .then(report => dispatch(receiveReport(report)))
        // .catch(err => console.log(err))
);

export const composeReport = report => dispatch => {
    debugger
    return(
    APIUtil.postReport(report)
        // .then(reports => dispatch(receiveReports(reports)))
        .then(report => dispatch(receiveReport(report)))
        // .catch(err => console.log(err))
)};