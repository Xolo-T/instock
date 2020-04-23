import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import "../App.css";
import "../index.css";

import SplashContainer from './splash/splash';
import NavbarContainer from './navbar/navbar_container';
import Map from './map/map';
import Modal from './modal/modal';


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