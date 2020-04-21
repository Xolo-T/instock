import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Navbar from './navbar';

const mapState = state => ({
    loggedIn: state.session.isAuthenticated
});

export default connect(mapState,{ logout })(Navbar);