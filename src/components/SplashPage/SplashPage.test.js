import React from 'react';
import renderer from 'react-test-renderer';

import SplashPage from '../SplashPage/SplashPage';

describe('SplashPage', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<SplashPage />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});