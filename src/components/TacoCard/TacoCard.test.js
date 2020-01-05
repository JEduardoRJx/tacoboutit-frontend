import React from 'react';
import renderer from 'react-test-renderer';

import TacoCard from '../TacoCard/TacoCard';

describe('TacoCard', () => {
  const mockType = 'Carne Asada'
  it('renders correctly', () => {
    const wrapper = renderer.create(<TacoCard type={mockType} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});