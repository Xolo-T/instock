import {connect} from 'react-redux'
import ReportForm from './report_form'
import { composeReport } from '../../actions/report_actions'

const mdp = (dispatch) => {
    return({
    composeReport: (report) => dispatch(composeReport(report))
    })
};

const msp = (state) => ({
    currentUser: state.session.user
});

export default connect(msp, mdp)(ReportForm)