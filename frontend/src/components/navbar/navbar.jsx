import React from 'react';

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
              <div className="navbar">
                <span className="welcome-header">welcome {this.props.currentUser.name}</span>
                <div className="navbar-buttons-wrappper">
                  <button className="navbar-button">profile</button>
                  <button className="navbar-button" onClick={this.logoutUser}>
                    log out
                  </button>
                </div>
              </div>
            );
        } else {
            return (
              <div className='navbar-buttons-wrapper'>
                <button className='navbar-button demo-button' onClick={this.demoLogin}>demo login</button>
                <button className='navbar-button' onClick={() => this.props.openModal("login")}>log in</button>
                <button className='navbar-button' onClick={() => this.props.openModal("signup")}>sign up</button>
              </div>
            );
        }
    }

    render() {
        return (
            <div className='navbar'>
              <img className="logo" src="./logo.png" alt="My_Logo"/>
              {this.populateNavbar()}
            </div>
        );
    }
}

export default Navbar;
