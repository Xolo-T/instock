import React from 'react';
import { Link } from 'react-router-dom';
import LoginFormContainer from '../session/login_form_container';
import SignupFormContainer from '../session/signup_form_container';

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
                    <Link to={"/profile"}>Profile</Link>
                    <button onClick={this.logoutUser}>Logout</button>
                    {/* <Link to={"/logout"}>Logout</Link> */}
                </div>
            )
        } else {
            return (
                <div>
                    <SignupFormContainer/>
                    <LoginFormContainer/>
                </div>
            )
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