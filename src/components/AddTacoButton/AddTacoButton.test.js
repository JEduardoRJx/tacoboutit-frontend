import React from 'react';
import renderer from 'react-test-renderer';

import AddTacoButton from '../AddTacoButton/AddTacoButton';

describe('AddTacoButton', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<AddTacoButton />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});