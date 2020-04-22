import { RECEIVE_REPORT } from "../actions/report_actions";
import { RECEIVE_CURRENT_USER, RECEIVE_USER_SIGN_IN } from "../actions/session_actions";

const usersReducer = (state = {}, action) => {

  Object.freeze(state);

  switch (action.type) {

    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {
        [action.currentUser.id]: action.currentUser,
      });

    case RECEIVE_REPORT:
      return Object.assign({}, state, { [action.report.id]: action.report });

    case RECEIVE_USER_SIGN_IN:
        debugger
        return Object.assign({}, state, { [action.currentUser.data._id]: action.currentUser.data })

    default:
      return state;
  }
};

export default usersReducer;