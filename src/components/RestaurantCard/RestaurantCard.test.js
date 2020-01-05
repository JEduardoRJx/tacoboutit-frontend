import React from 'react';
import renderer from 'react-test-renderer';

import RestaurantCard from '../RestaurantCard/RestaurantCard';

describe('RestaurantCard', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<RestaurantCard />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});