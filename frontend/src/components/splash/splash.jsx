import React from 'react';

class Splash extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
          <div>
            <h1>This is the InStock splash page</h1>
            <footer>Powered by Petit Pot. Copyright &copy; 2020 Team PuddingHunter.</footer>
          </div>
        );
    }
}

export default Splash;