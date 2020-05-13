import React from "react";
import { connect } from "react-redux";
import { signup, login } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import SignupForm from "./signup_form";

const mapStateToProps = (state) => {
  
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
    login: (user) => dispatch(login(user)),
    otherForm: (
      <button className="input-button-2" onClick={() => dispatch(openModal("login"))}>Log in</button>
    ),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
