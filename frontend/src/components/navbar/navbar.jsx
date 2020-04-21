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
                <div>
                    <button>Profile</button>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            )
        } else {
            return (
              <div>
                <button onClick={() => this.props.openModal("login")}>Login</button>
                &nbsp;or&nbsp;
                <button onClick={() => this.props.openModal("signup")}>Signup</button>
              </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h1>Navbar</h1>
                {this.populateNavbar()}
            </div>
        );
    }
}

export default Navbar;