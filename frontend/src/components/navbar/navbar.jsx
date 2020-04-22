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
                <div className='navbar-buttons'>
                    <button className='navbar-button'>Profile</button>
                    <button className='navbar-button' onClick={this.logoutUser}>Logout</button>
                </div>
            )
        } else {
            return (
              <div className='navbar-buttons'>
                <button className='navbar-button' onClick={() => this.props.openModal("login")}>Login</button>
                &nbsp;or&nbsp;
                <button className='navbar-button' onClick={() => this.props.openModal("signup")}>Signup</button>
              </div>
            );
        }
    }

    render() {
        return (
            <div className='navbar'>
                {this.populateNavbar()}
            </div>
        );
    }
}

export default Navbar;