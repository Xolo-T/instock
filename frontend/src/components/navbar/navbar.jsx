import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.populateNavbar = this.populateNavbar.bind(this);
    }

    logoutUser(e) {
        e.preventDefaultf();
        this.props.logout();
    }

    populateNavbar() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <Link to={"/profile"}>Profile</Link>
                    <Link to={"/logout"}>Logout</Link>
                </div>
            )
        } else {
            return (
                <div>
                    <Link to={"/login"}>Login</Link>
                    <Link to={"/signup"}>Sign up</Link>
                    }
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