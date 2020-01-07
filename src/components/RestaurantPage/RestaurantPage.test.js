import React from 'react';
import renderer from 'react-test-renderer';

import RestaurantPage from '../RestaurantPage/RestaurantPage';

describe('RestaurantPage', () => {
  const mockRestaurant = {
    address: "2835 W 72nd Ave, Westminster, CO 80030",
    distance: 3.52669047076749,
    id: 1,
    image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/tNN5NvMch7rJMm-YyTLTxA/o.jpg",
    is_closed: false,
    latitude: 39.82754,
    longitude: -105.02161,
    name: "Guadalajara Mexican Restaurant",
    phone: "+13034269540",
    review_count: 471,
    tacoboutit_item_review_count: 0,
    tacos: [{
        id: 1,
        restaurant: 1,
        type: "al pastor",
        reviews: [
          { taco: 1, rating: 4, review: 'Great spot' }
        ],
        average_rating: 5,
      },
       {
        id: 2,
        restaurant: 1,
        type: "carne asada",
        reviews: [
          { taco: 1, rating: 4, review: 'Great spot' }
        ],
        average_rating: 5,
      },
      {
        id: 3,
        restaurant: 1,
        type: "cabeza",
        reviews: [
          { taco: 1, rating: 4, review: 'Great spot' },
        ],
        average_rating: 5,
      },
       {
        id: 8,
        restaurant: 1,
        type: "testing",
        reviews: [
          { taco: 1, rating: 4, review: 'Great spot' }
        ],
        average_rating: 5,
      },
      {
        id: 13,
        restaurant: 1,
        type: "carnitas",
        reviews: [
          { taco: 1, rating: 4, review: 'Great spot' }
        ],
        average_rating: 5,
      },
    ],
    url: "https://www.yelp.com/biz/guadalajara-mexican-restaurant-westminster?adjust_creative=pxQ3XEqH9sM15FQYWsuBXQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=pxQ3XEqH9sM15FQYWsuBXQ",
    yelp_id: "3LoMv9TtprQhH1AmN33ubA",
    yelp_rating: 4.5,
  }

  it('renders correctly', () => {
    const wrapper = renderer.create(<RestaurantPage restaurant={mockRestaurant} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});