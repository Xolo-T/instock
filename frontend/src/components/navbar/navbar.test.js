import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../../test/testUtils';

import Navbar from './navbar.jsx';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the Navbar component
 * @function setup
 * @param {object} props  - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */

const setup = (props={}) => {
  return shallow(<Navbar {...props} />)
}; 

test('Renders component without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-navbar');
  expect(component.length).toBe(1);
});

test('Renders a help button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "help-button");
  expect(button.length).toBe(1);
});

describe('When user is logged in', () => {
  const wrapper = setup({ loggedIn: true, currentUser: {name: "demo-user"} });

  test('there is a welcome message including current user\'s name', () => {
    const message = findByTestAttr(wrapper, "welcome-message");
    expect(message.text()).toBe('welcome demo-user');
  });
  test('there is a logout button', () => {
    const button = findByTestAttr(wrapper, "logout-button");
    expect(button.length).toBe(1);
  });
});

describe('When user is not logged in', () => {
  const wrapper = setup({ loggedIn: false });
  
  test('there is a demo login button', () => {
    const button = findByTestAttr(wrapper, "demo-login-button");
    expect(button.length).toBe(1);
  });
  test('there is a login button', () => {
    const button = findByTestAttr(wrapper, "login-button");
    expect(button.length).toBe(1);
  });
  test('there is a signup button', () => {
    const button = findByTestAttr(wrapper, "signup-button");
    expect(button.length).toBe(1);
  });
});