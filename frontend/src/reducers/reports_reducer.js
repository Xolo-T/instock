import {
    RECEIVE_REPORTS,
    RECEIVE_REPORT,
    
} from '../actions/report_actions';

export default function (state = {}, action) {
    
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_REPORTS:
            const fetchedReports = {}
            action.reports.data.forEach(report => {
                fetchedReports[report._id] = report 
            });
            return fetchedReports;
        case RECEIVE_REPORT:
            const newReport = {}
            newReport[action.report.data._id] = action.report.data
            const newState = Object.assign({}, state, newReport)
            return newState;
        default:
            return state;
    }
}