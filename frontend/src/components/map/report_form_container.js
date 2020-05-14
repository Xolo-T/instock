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
    // currentUser: "5ea189ef5fab3706d30028bc",
    // lng: this.props.lng,
    // lat: this.props.lat
});

export default connect(msp, mdp)(ReportForm)