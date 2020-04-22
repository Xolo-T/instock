import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

import SplashContainer from './splash/splash';
import NavbarContainer from './navbar/navbar_container';
import Map from './map/map'; 
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import Modal from './modal/modal';

console.log(process.env.REACT_APP_GOOGLE_KEY)

const App = () => (
    <div>
    <Modal />
    <NavbarContainer/>
    <Map/>
    <Switch>
        <AuthRoute exapct path="/" component={SplashContainer} />
    </Switch>
    </div>
);

export default App;