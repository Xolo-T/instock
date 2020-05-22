import React from 'react';
import { withRouter } from 'react-router-dom';

class help extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div id='help-div' className="auth-form-container">
        
        <span className="modal-closer-button" onClick={this.props.closeModal}>
          <i className="fas fa-times"></i>
        </span>
        
        <span className="login-or-signup-message">Instructions</span>
        
        {/* <img class="icon" src="/icon.png" alt="InStock Toilet Paper Icon" /> */}
        <div className='help-instructions'>
            <h3 className='instruction-h3'>To view reports</h3>
            <ul className='instruction-ul'>
                <li>Simply click on a tp icon to view the details</li>
                <li>You can also search for a store to see if it was reported</li>
            </ul>
            <h3 className='instruction-h3'>To approve/disapprove reports</h3>
            <ul className='instruction-ul'>
                <li>Log in</li>
                <li>Open report you want to approve</li>
                <li>Click on thumbs up to approve or vice versa</li>
            </ul>
            <h3 className='instruction-h3'>To create reports</h3>
            <ul className='instruction-ul'>
                <li>Log in</li>
                <li>Use the search bar to search for a store you want to report</li>
                <li>If store isn't reported yet a form will pop up</li>
                <li>You can edit the name if not accurate</li>
                <li>Submit report by clicking "Yup"</li>
            </ul>
        </div>
      
      </div>
    );
  }
}

export default withRouter(help);