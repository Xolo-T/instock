import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form';

const mapState = state => {
    return {
        errors: state.errors.session
    };
};

const mapDispatch = dispatch => {
    return {
        login: user => dispatch(login(user))
    };
};

export default connect(mapState, mapDispatch)(LoginForm);