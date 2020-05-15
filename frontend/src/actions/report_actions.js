import * as APIUtil from '../util/report_api_util';

export const RECEIVE_REPORTS = "RECEIVE_REPORTS";
export const RECEIVE_REPORT = "RECEIVE_REPORT";

export const receiveReports = reports => ({
    type: RECEIVE_REPORTS,
    reports
});

export const receiveReport = report => {
    
    return {
    type: RECEIVE_REPORT,
    report
}};

export const fetchReports = () => dispatch => (
    APIUtil.getReports()
        .then(reports => dispatch(receiveReports(reports)))
);

export const fetchPlaceReports = placeId => dispatch => (
    APIUtil.getPlaceReports(placeId)
        .then(reports => dispatch(receiveReports(reports)))
);

export const fetchReport = report => dispatch => (
    APIUtil.getReport(report)
        .then(report => dispatch(receiveReport(report)))
);

export const composeReport = report => dispatch => {
    return(
    APIUtil.postReport(report)
        .then(report => dispatch(receiveReport(report)))
)};

export const updateReport = reportId => dispatch => {
    
    return (
        APIUtil.updateApprovals(reportId).then(report => dispatch(receiveReport(report)))
    )
}