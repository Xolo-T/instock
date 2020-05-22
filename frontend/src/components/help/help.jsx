import React from 'react';
import { withRouter } from 'react-router-dom';
// import './session_form.css';

class help extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
      emailError: "",
      passwordError: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.closeModalOnSubmit = this.closeModalOnSubmit.bind(this);
  }

  validate() {
    let emailError = "";
    let passwordError = "";

    if (this.state.email.length === 0) {
      emailError = "Email can't be blank";
    }

    if (this.state.password.length === 0) {
      passwordError = "Password can't be blank";
    }

    if (emailError) {
      this.setState({ emailError });
      this.setState({ passwordError });
      return false;
    }

    if (passwordError) {
      this.setState({ passwordError });
      this.setState({ emailError });
      return false;
    }

    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/logged_in");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  closeModalOnSubmit() {
    if (Object.values(this.props.errors).length === 0) {
      this.props.closeModal();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    this.setState({
      emailError: "",
      passwordError: "",
    });

    let user = {
      email: this.state.email,
      password: this.state.password,
    };
    const isValid = this.validate();
    if (isValid) {
      this.props.login(user).then(this.closeModalOnSubmit);
    }
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  keyPress(e) {
    if (e.key === "Escape") {
      this.props.closeModal();
    }
  }

  renderForm() {
    return (
      <div id='help-div' className="auth-form-container">
        
        <span className="modal-closer-button" onClick={this.props.closeModal}>
          <i className="fas fa-times"></i>
        </span>
        
        <span className="login-or-signup-message">Instructions</span>
        
        {/* <img class="icon" src="/icon.png" alt="InStock Toilet Paper Icon" /> */}
        
        <h3>To view reports</h3>
        <ul>
            <li>Simply click on a tp icon to view the details</li>
            <li>You can also search for a store to see if it was reported</li>
        </ul>
        <h3>To approve/disapprove reports</h3>
        <ul>
            <li>Log in</li>
            <li>Open report you want to approve</li>
            <li>Click on thumbs up to approve or vice versa</li>
        </ul>
        <h3>To create reports</h3>
        <ul>
            <li>Log in</li>
            <li>Use the search bar to search for a store you want to report</li>
            <li>If store isn't reported yet a form will pop up</li>
            <li>You can edit the name if not accurate</li>
            <li>Submit report by clicking "Yup"</li>
        </ul>
      
      </div>
    );
  }

  render() {
    return this.renderForm();
  }
}

export default withRouter(help);