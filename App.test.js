import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as api from './src/apiCalls';

import { App } from './App';
import { mockRestaurants } from './mockRestaurants';

describe('App', () => {
  let wrapper;
  const mockNewTaco = jest.fn();
  const mockStateRestaurants = [
    {
        "id": 1,
        "yelp_id": "lAeWTnxwadpS20I25kSbnQ",
        "name": "Las Delicias North",
        "phone": "+13034300422",
        "is_closed": false,
        "review_count": 170,
        "yelp_rating": 3.5,
        "url": "https://www.yelp.com/biz/las-delicias-north-denver-2?adjust_creative=pxQ3XEqH9sM15FQYWsuBXQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=pxQ3XEqH9sM15FQYWsuBXQ",
        "latitude": 39.834828,
        "longitude": -104.986963,
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/p0JDroBv0kkPQ5eTenBcuQ/o.jpg",
        "address": "7610 Conifer Rd, Denver, CO 80221",
        "distance": 563.486550595786,
        "tacoboutit_item_review_count": 0,
        "tacos": [
            {
                "id": 9,
                "type": "Testing testing",
                "restaurant_id": 1,
                "average_rating": 5.0,
                "reviews": [
                    {
                        "id": 1,
                        "rating": 7.0,
                        "review": "its ok",
                        "taco": 9
                    },
                    {
                        "id": 2,
                        "rating": 4.0,
                        "review": "lame",
                        "taco": 9
                    },
                    {
                        "id": 3,
                        "rating": 4.0,
                        "review": null,
                        "taco": 9
                    },
                    {
                        "id": 4,
                        "rating": 1.0,
                        "review": "This taco put my son in the hospital",
                        "taco": 9
                    },
                    {
                        "id": 5,
                        "rating": 10.0,
                        "review": "The best",
                        "taco": 9
                    },
                    {
                        "id": 6,
                        "rating": 4.0,
                        "review": "meh",
                        "taco": 9
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "yelp_id": "Oum4nOuOsyMRM5jnc6pGLQ",
        "name": "Freds Breakfast Burritos",
        "phone": "+13034283145",
        "is_closed": false,
        "review_count": 40,
        "yelp_rating": 5.0,
        "url": "https://www.yelp.com/biz/freds-breakfast-burritos-denver?adjust_creative=pxQ3XEqH9sM15FQYWsuBXQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=pxQ3XEqH9sM15FQYWsuBXQ",
        "latitude": 39.8234851,
        "longitude": -104.9892212,
        "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/BrjCYwtiLR-R5qyddrnjnw/o.jpg",
        "address": "130 W 70th Ave, Denver, CO 80221",
        "distance": 1782.59977835185,
        "tacoboutit_item_review_count": 0,
        "tacos": []
    }];

  beforeEach(() => {
     wrapper = shallow(<App />);
     wrapper.setState({ restaurants: mockStateRestaurants});
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to handlePress', async () => {
    expect(wrapper.state('restaurants').length).toBe(2);
    await wrapper.instance().handlePress(1);
    expect(wrapper.state('selectedRestaurant')).toEqual(mockStateRestaurants[0]);
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

  it('updateLocalTacos should add a taco to a restaurant in state', () => {
    const mockNewTaco = { restaurant: 1, type: 'test type', id: 23, reviews: [] };
    wrapper.instance().updateLocalTacos(mockNewTaco);
    expect(wrapper.state('restaurants')[0].tacos[1]).toEqual(mockNewTaco);
  });
});