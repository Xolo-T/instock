import {
    RECEIVE_REPORTS,
    RECEIVE_REPORT,
    
} from '../actions/report_actions';

export default function (state = {}, action) {
    
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_REPORTS:
            return action.reports.data;
        case RECEIVE_REPORT:
            return [action.report.data]
        default:
            return state;
    }
}