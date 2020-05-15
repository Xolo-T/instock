import { connect } from 'react-redux';
import { fetchReports, fetchPlaceReports, fetchReport, composeReport } from '../../actions/report_actions';
import { selectAllReports } from '../../reducers/selectors';
import Map from './map';

const mapState = state => {
    return({
        reports: selectAllReports(state.reports),
        isAuthenticated: state.session.isAuthenticated,
        currentUser: state.session.user
    });
};

const mapDispatch = dispatch => {
    return({
        fetchReports: () => dispatch(fetchReports()),
        fetchPlaceReports: placeId => dispatch(fetchPlaceReports(placeId)),
        fetchReport: report => dispatch(fetchReport(report)),
        composeReport: report => dispatch(composeReport(report))
    });
};

export default connect(mapState, mapDispatch)(Map);