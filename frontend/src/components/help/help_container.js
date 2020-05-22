import React from "react";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../actions/modal_actions";
import help from "./help";

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(null, mapDispatchToProps)(help);
