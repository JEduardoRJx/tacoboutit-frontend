import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import RestaurantCard from '../RestaurantCard/RestaurantCard';

describe('RestaurantCard', () => {
  const mockHandlePress = jest.fn();
  const wrapper = shallow(<RestaurantCard
    name="Taco Spot"
    address="123 drive"
    isClosed={false}
    img="https://some-url-for-the-image/asld.jpg"
    handlePress={mockHandlePress}
    distance="1235.5"
    id="1"
  />)
  it('renders correctly', () => {
    const wrapper = renderer.create(<RestaurantCard 
      name="Taco Spot"
      address="123 drive"
      isClosed={false}
      img="https://some-url-for-the-image/asld.jpg"
      handlePress={mockHandlePress}
      distance="1235.5"
      id="1"
    />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('when a user clicks the card handle press should be called', () => {
    wrapper.simulate('press');
    expect(mockHandlePress).toHaveBeenCalledWith("1");
  });
});