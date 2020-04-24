import React from 'react';

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.populateNavbar = this.populateNavbar.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    populateNavbar() {
        if (this.props.loggedIn) {
            return (
              <div className="navbar-buttons">
                <button className="navbar-button-1">profile</button>
                <button className="navbar-button-2" onClick={this.logoutUser}>
                  log out
                </button>
              </div>
            );
        } else {
            return (
              <div className='navbar-buttons'>
                <button className='navbar-button-1' onClick={() => this.props.openModal("login")}>log in</button>
                <button className='navbar-button-2' onClick={() => this.props.openModal("signup")}>sign up</button>
              </div>
            );
        }
    }

    render() {
        return (
            <div className='navbar'>
              <img class="logo" src="http://localhost:3000/logo.png" alt="My_Logo"/>
              {this.populateNavbar()}
            </div>
        );
    }
}

export default Navbar;