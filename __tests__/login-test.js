import 'react-native';
import React from 'react';
import {connectAdvanced, useSelector} from 'react-redux';
import Login from '../src/screens/Login/login';
import {render, fireEvent, act} from '@testing-library/react-native';
import {miniSerializeError} from '@reduxjs/toolkit';

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

describe('getButton', () => {
  // const data = {email: 'aaa@mail.com', password: 'sangat rahasia'};
  it('button onClick', () => {
    // const onPressMock = jest.fn();
    const {getByTestId, getAllByA11yStates} = render(<Login />);
    const element = getByTestId('button-login');
    // act(() => fireEvent.press(element));
    // expect(element.props.onClick).toHaveBeenCalledTimes(1);
    expect(fireEvent.press(element));
  });
});
