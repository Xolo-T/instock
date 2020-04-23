import React from "react";
import { withRouter } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      password: "",
      password2: "",
      errors: {},
      emailError: "",
      usernameError: "",
      passwordError: "",
      password2Error: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.clearedErrors = false;
  }

  validate() {
    let emailError = "";
    let usernameError = "";
    let passwordError = "";
    let password2Error = "";

    if (this.state.userName.length === 0) {
      usernameError = "Username can't be empty";
    }

    if (this.state.email.length === 0) {
      emailError = "Email can't be empty";
    }

    if (this.state.password.length === 0) {
      passwordError = "Password can't be empty";
    }

    if (this.state.password.length === 0) {
      passwordError = "Password can't be empty";
    } else if (this.state.password2 !== this.state.password) {
      passwordError = "Passwords should be the same";
      password2Error = "Passwords should be the same";
    }

    if (this.state.password2.length === 0) {
      password2Error = "Password can't be empty";
    }

    if (usernameError) {
      this.setState({ usernameError });
      this.setState({ emailError });
      this.setState({ passwordError });
      this.setState({ password2Error });
      return false;
    }

    if (emailError) {
      this.setState({ usernameError });
      this.setState({ emailError });
      this.setState({ passwordError });
      this.setState({ password2Error });
      return false;
    }

    if (passwordError) {
      this.setState({ passwordError });
      this.setState({ password2Error });
      this.setState({ usernameError });
      this.setState({ emailError });
      return false;
    }
    if (passwordError) {
      this.setState({ passwordError });
      this.setState({ password2Error });
      this.setState({ usernameError });
      this.setState({ emailError });
      return false;
    }

    if (password2Error) {
      this.setState({ passwordError });
      this.setState({ password2Error });
      this.setState({ usernameError });
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

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      userName: this.state.userName,
      password: this.state.password,
      password2: this.state.password2,
    };

    const isValid = this.validate();
    
    if (isValid) {
      this.props.signup(user, this.props.history);
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

  keyPress (e) {
    if(e.key === "Escape") {
        this.props.closeModal();
    }
  }

  renderForm() {
    return (
      <div className="auth-form-container">
        <span className="modal-closer-button" onClick={this.props.closeModal}>
          <i class="fas fa-times"></i>
        </span>
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <span className="login-or-signup-message">sign up</span>
          <input
            type="text"
            value={this.state.email}
            onChange={this.update("email")}
            placeholder="Email"
          />
          <div className="frontEnd-session-errors">{this.state.emailError}</div>
          <input
            type="text"
            value={this.state.userName}
            onChange={this.update("userName")}
            placeholder="Username"
          />
          <div className="frontEnd-session-errors">
            {this.state.usernameError}
          </div>
          <input
            type="password"
            value={this.state.password}
            onChange={this.update("password")}
            placeholder="Password"
          />
          <div className="frontEnd-session-errors">
            {this.state.passwordError}
          </div>
          <input
            type="password"
            value={this.state.password2}
            onChange={this.update("password2")}
            placeholder="Confirm Password"
          />
          <div className="frontEnd-session-errors">
            {this.state.password2Error}
          </div>
          <input type="submit" value="Submit" />
          {this.renderErrors()}

          {this.props.otherForm}
        </form>
      </div>
    );
  }

  render() {
    return this.renderForm();
  }
}

export default withRouter(SignupForm);
