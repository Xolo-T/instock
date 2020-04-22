import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout, signup, login } from './actions/session_actions';
import { getReports, getReport, postReport, getPlaceReports } from './util/report_api_util';

document.addEventListener('DOMContentLoaded', () => {

  let store;

  
  if (localStorage.jwtToken) {
    
    setAuthToken(localStorage.jwtToken);
    
    const decodedUser = jwt_decode(localStorage.jwtToken);
    
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };
    
    store = configureStore(preloadedState);
    
    const currentTime = Date.now() / 1000;
    
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    store = configureStore({});
  }
  //TESTING//
  window.getState = store.getState
  window.dispatch = store.dispatch;
  window.logout = logout;
  window.signup = signup;
  window.login = login;
  window.getReports = getReports;
  window.getReport = getReport;
  window.postReport = postReport;
  window.getPlaceReports = getPlaceReports;
  //
  const root = document.getElementById('root');
  
  ReactDOM.render(<Root store={store} />, root);
});