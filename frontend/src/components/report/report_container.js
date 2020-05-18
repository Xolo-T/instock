import { connect } from 'react-redux';
import { updateReport } from '../../actions/report_actions';
import Report from './report';

const mapDispatch = dispatch => {
  return({
    updateReport: reportId => dispatch(updateReport(reportId))
  });
};

export default connect(null, mapDispatch)(Report);