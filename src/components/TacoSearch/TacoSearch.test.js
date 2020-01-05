import React from 'react';
import renderer from 'react-test-renderer';

import TacoSearch from '../TacoSearch/TacoSearch';

describe('TacoSearch', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<TacoSearch />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});