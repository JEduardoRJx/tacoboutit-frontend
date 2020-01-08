import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as api from './src/apiCalls';

import { App } from './App';

describe('App', () => {
  let wrapper;
  const mockNewTaco = jest.fn();
  const mockStateRestaurants = [{
    address: "2835 W 72nd Ave, Westminster, CO 80030",
    name: "Guadalajara Mexican Restaurant",
    id: 1,
  }, {
    address: "1111 W Taco St, CO 80211",
    name: "Taco Taco Taco",
    id: 2,
  }];

  beforeEach(() => {
     wrapper = shallow(<App />);
     wrapper.setState({ restaurants: mockStateRestaurants});
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should return a permission error message', async () => {
    let mockGetLocation = jest.fn().mockImplementation(() => {
      return Permissions.askAsync = jest.fn().mockResolvedValue({
        status: 'denied',
      });
    })
    const status = wrapper.mockGetLocation();
    // await wrapper.instance()._getLocationAsync()
    expect(wrapper.state('error')).toBe('Permission to access location was denied');
  });

  it('should be able to handlePress', async () => {
    expect(wrapper.state('restaurants').length).toBe(2);
    await wrapper.instance().handlePress(1);
    expect(wrapper.state('selectedRestaurant')).toEqual({
      address: "2835 W 72nd Ave, Westminster, CO 80030",
      name: "Guadalajara Mexican Restaurant",
      id: 1,
    })
  })

  it('submitNewTaco should return the response from BE', async () => {
    const mockResponse = { 
      id: 1, 
      restaurantId: 2, 
      averageRating: null, 
      type: 'carne asada', 
      reviews: [],
    };
    api.newTaco = jest.fn().mockImplementation(() => Promise.resolve(mockResponse));
    const mockUpdateLocalTacos = jest.fn();
    wrapper.instance().updateLocalTacos = mockUpdateLocalTacos;
    const result = await wrapper.instance().submitNewTaco('carne asada', 2);
    expect(mockUpdateLocalTacos).toHaveBeenCalledWith({"restaurant": 2, "type": "carne asada"});
    expect(result).toEqual(mockResponse);
  });
});