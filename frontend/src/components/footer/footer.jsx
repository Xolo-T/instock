import React from 'react';

class Footer extends React.Component {

    render() {
        return(
            <footer>
                Click <a onClick={() => this.props.openModal("about")}>here</a> to learn more about the developers of InStock.
            </footer>
        )
    }
}

export default Footer;