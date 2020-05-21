import React from 'react';
import './footer.css';

class Footer extends React.Component {

    render() {
        return(
            <footer>
                <a className="link" onClick={() => this.props.openModal("about")}>Learn more about the developers of InStock</a> 
            </footer>
        )
    }
}

export default Footer;