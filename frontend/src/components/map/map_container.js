import { connect } from 'react-redux';
import { fetchReports, fetchPlaceReports, fetchReport, composeReport } from '../../actions/report_actions';

const mapDispatch = dispatch => ({
    fetchReports: () => dispatch(fetchReports()),
    fetchPlaceReports: placeId => dispatch(fetchPlaceReports(placeId)),
    fetchReport: report => dispatch(fetchReport(report)),
    composeReport: report => dispatch(composeReport(report))
})

export default connect(null, mapDispatch)(Map);