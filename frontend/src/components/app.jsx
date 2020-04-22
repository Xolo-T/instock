import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

import SplashContainer from './splash/splash';
import NavbarContainer from './navbar/navbar_container';
import Modal from './modal/modal';

const App = () => (
    <div>
    <Modal />
    <NavbarContainer/>
    <Switch>
        <AuthRoute exapct path="/" component={SplashContainer} />
    </Switch>
    </div>
);

export default App;