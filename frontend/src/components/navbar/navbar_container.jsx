import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import Navbar from './navbar';

const mapState = state => ({
    loggedIn: state.session.isAuthenticated
});

const mapDispatch = dispatch => ({
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal))
});

export default connect(mapState, mapDispatch)(Navbar);