import { connect } from 'react-redux';
import { login, logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import Navbar from './navbar';

const mapState = state => ({
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user
});

const mapDispatch = dispatch => ({
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal))
});

export default connect(mapState, mapDispatch)(Navbar);