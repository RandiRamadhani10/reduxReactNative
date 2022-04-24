import 'react-native';
import React from 'react';
import Login from '../src/screens/Login/login';
import {render, fireEvent, act} from '@testing-library/react-native';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
  useSelector: jest.fn(state => {
    state({});
    return {email: '', password: '', token: null, isLogin: false, isMsg: false};
  }),
}));

describe('render login screen', () => {
  it('renders correctly', () => {
    const components = render(<Login />).toJSON();

    expect(components).toMatchSnapshot();
  });
});

describe('getButton Login', () => {
  it('button onClick', () => {
    const {getByTestId, getAllByA11yStates} = render(<Login />);
    const email = 'aldialdi@gmail.com';
    const password = 'pisangisbanana2021';
    const emailButton = getByTestId('email-input');
    const passwordButton = getByTestId('password-input');
    const element = getByTestId('button-login');

    fireEvent.changeText(emailButton, email);
    expect(emailButton.props.value).toBe(email);
    fireEvent.changeText(passwordButton, password);
    expect(passwordButton.props.value).toBe(password);
    fireEvent.press(element);
  });
});
