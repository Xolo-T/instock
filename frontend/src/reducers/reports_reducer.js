import {
    RECEIVE_REPORTS,
    RECEIVE_REPORT,
    
} from '../actions/report_actions';

export default function (state = {}, action) {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_REPORTS:
            // debugger
            return action.reports.data;
        case RECEIVE_REPORT:
            // debugger
            // return Object.assign({}, state, action.report)
            return [action.report.data]
        default:
            return state;
    }
}