import { connect } from 'react-redux';
import { updateReport, downDateReport } from '../../actions/report_actions';
import Report from './report';

const mapDispatch = dispatch => {
  return({
    updateReport: reportId => dispatch(updateReport(reportId)),
    downDateReport: reportId => dispatch(downDateReport(reportId)),
  });
};

export default connect(null, mapDispatch)(Report);