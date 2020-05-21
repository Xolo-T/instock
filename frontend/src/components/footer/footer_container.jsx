import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import Footer from './footer';

const mapDispatch = dispatch => ({
    openModal: modal => dispatch(openModal(modal))
});

export default connect(null, mapDispatch)(Footer);