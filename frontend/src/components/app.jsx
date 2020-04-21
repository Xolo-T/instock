import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

import SplashContainer from './splash/splash';
import NavbarContainer from './navbar/navbar_container';
import Map from './map/map'; 
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

const App = () => (
    <div>
    <NavbarContainer/>
    <Map/>
    <Switch>
        <AuthRoute exapct path="/" component={SplashContainer} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>
    </div>
);

export default App;