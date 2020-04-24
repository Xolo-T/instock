import {
    RECEIVE_REPORTS,
    RECEIVE_REPORT,
    
} from '../actions/report_actions';

export default function (state = {}, action) {
    
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_REPORTS:
            debugger
            // return action.reports.data;
            const fetchedReports = {}
            action.reports.data.forEach(report => {
                fetchedReports[report._id] = report 
            });
            return fetchedReports;
        case RECEIVE_REPORT:
            debugger
            // return Object.assign({}, state, action.report)
            const newReport = {}
            newReport[action.report.data._id] = action.report.data
            debugger
            const newState = Object.assign({}, state, newReport)
            debugger
            return newState;
            // return [action.report.data]
        default:
            return state;
    }
}