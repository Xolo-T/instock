import React from 'react';
import './navbar.css';

/**
 * Class react component for navbar.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component
 */
class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.populateNavbar = this.populateNavbar.bind(this);
        this.demoLogin = this.demoLogin.bind(this);
    }

    demoLogin(e) {
      e.preventDefault();
      const user = { email: "demo-user@mailinator.com", password: "password" };
      this.props.login(user);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    populateNavbar() {
        if (this.props.loggedIn) {
            return (
              <nav className="navbar">
                <label htmlFor="hamburger">
                  <i className="fa fa-2x">&#9776;</i>
                </label>
                <input type="checkbox" id="hamburger"></input>
                <div id="hamitems">
                  <div className="navbar-buttons-wrapper">
                    <button data-test="help-button" className="navbar-button" onClick={() => this.props.openModal("help")}>
                      help
                    </button>
                    <button data-test="logout-button" className="navbar-button" onClick={this.logoutUser}>
                      log out
                    </button>
                  </div>
                </div>
              </nav>
            );
        } else {
            return (
              <nav className="navbar">
                <label htmlFor="hamburger">
                  <i className="fa fa-2x">&#9776;</i>
                </label>
                <input type="checkbox" id="hamburger"></input>

                <div id="hamitems">
                  <div className="navbar-buttons-wrapper ">
                  <button
                      data-test="help-button"
                      className="navbar-button"
                      onClick={() => this.props.openModal("help")}
                    >
                      help
                    </button>
                    <button
                      data-test="demo-login-button"
                      className="navbar-button demo-button"
                      onClick={this.demoLogin}
                    >
                      demo login
                    </button>
                    <button
                      data-test="login-button"
                      className="navbar-button"
                      onClick={() => this.props.openModal("login")}
                    >
                      log in
                    </button>
                    <button
                      data-test="signup-button"
                      className="navbar-button"
                      onClick={() => this.props.openModal("signup")}
                    >
                      sign up
                    </button>
                  </div>
                </div>
              </nav>
            );
        }
    }

    render() {

        if (this.props.loggedIn) {
        return (
          <div data-test="component-navbar" className="navbar">
            <div className="navbar-header">
              <img className="logo" src="./logo.png" alt="My_Logo" />
              <span data-test="welcome-message" className="welcome-header">
                welcome {this.props.currentUser.name}
              </span>
            </div>
            {this.populateNavbar()}
          </div>
        );
        }
        else {
          return (
            <div data-test="component-navbar" className="navbar">
                <img className="logo" src="./logo.png" alt="My_Logo" />
              {this.populateNavbar()}
            </div>
          );
        }
    }
}

export default Navbar;



 
