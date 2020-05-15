import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
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
      <div className="auth-form-container">
        <span className="modal-closer-button" onClick={this.props.closeModal}>
          <i className="fas fa-times"></i>
        </span>
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <span className="login-or-signup-message">log in</span>
          <img class="icon" src="/icon.png" alt="InStock Toilet Paper Icon" />
          {this.renderErrors()}
          <input className="input"
            type="text"
            value={this.state.email}
            onChange={this.update("email")}
            placeholder="Email"
          />
          <div className="frontEnd-session-errors">{this.state.emailError}</div>
            <input className="input"
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
          <div className="frontEnd-session-errors">
            {this.state.passwordError}
          </div>
          <input className="input-button-1" type="submit" value="Submit" />
          {this.props.otherForm}
        </form>
      </div>
    );
  }

  render() {
    return this.renderForm();
  }
}

export default withRouter(LoginForm);