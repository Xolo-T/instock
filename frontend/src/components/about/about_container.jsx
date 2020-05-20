import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import About from './about';

const mapDispatch = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(null, mapDispatch)(About);