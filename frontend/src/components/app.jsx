import React from 'react';
import "../App.css";
import "../index.css";

import SplashContainer from './splash/splash';
import NavbarContainer from './navbar/navbar_container';
import MapContainer from './map/map_container';
import Modal from './modal/modal';
import FooterContainer from './footer/footer_container';


const App = () => (
    <>
        <Modal />
        <NavbarContainer />
        <MapContainer />
        <FooterContainer />
    </>
);

export default App;