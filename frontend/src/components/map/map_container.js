import { connect } from 'react-redux';
import { fetchReports, fetchPlaceReports, fetchReport, composeReport } from '../../actions/report_actions';
import Map from './map';

const mapState = state => {
    debugger
    return({
        reports: Object.values(state.reports)
    })
}

const mapDispatch = dispatch => {
    return({
        fetchReports: () => dispatch(fetchReports()),
        fetchPlaceReports: placeId => dispatch(fetchPlaceReports(placeId)),
        fetchReport: report => dispatch(fetchReport(report)),
        composeReport: report => dispatch(composeReport(report))
    })
}

export default connect(mapState, mapDispatch)(Map);