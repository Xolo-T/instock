import * as APIUtil from './report_actions';

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

export const fetchReports = () => (
    getReports().then(reports => dispatch(receiveReports(reports))).catch(err => console.log(err))
);

export const fetchReport = report => (
    getReport(report).then(report => dispatch(receiveReport(report))).catch(err => console.log(err))
);

export const composeReport = report => dispatch => (
    postReport(report).then(report => dispatch(receiveReport(report))).catch(err => console.log(err))
);