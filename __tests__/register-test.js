import 'react-native';
import React from 'react';
import Register from '../src/screens/Register/register';
import {render, fireEvent} from '@testing-library/react-native';

describe('render register screen', () => {
  it('renders correctly', () => {
    const components = render(<Register />).toJSON();
    expect(components).toMatchSnapshot();
  });
});

describe('getButton Register', () => {
  it('button onClick', () => {
    const {getByTestId} = render(<Register />);
    const element = getByTestId('button-register');
    const fullname = 'randi ramadhani';
    const email = 'randi@gmail.com';
    const password = 'pisangisbanana2021';
    const emailButton = getByTestId('email-input');
    const passwordButton = getByTestId('password-input');
    const fullnameButton = getByTestId('fullname-input');

    fireEvent.changeText(fullnameButton, fullname);
    expect(fullnameButton.props.value).toBe(fullname);
    fireEvent.changeText(emailButton, email);
    expect(emailButton.props.value).toBe(email);
    fireEvent.changeText(passwordButton, password);
    expect(passwordButton.props.value).toBe(password);
    fireEvent.press(element)
  });
});
