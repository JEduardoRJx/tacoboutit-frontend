import React from 'react';
import ReviewsPage from './ReviewsPage';
import { shallow } from 'enzyme';

describe('ReviewsPage', () => {
  const mockTacos = [
    {
        "id": 9,
        "type": "Testing testing",
        "restaurant_id": 2,
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
];
  const wrapper = shallow(<ReviewsPage tacos={mockTacos}/>);
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.setState({ toggleForm: true });
    expect(wrapper).toMatchSnapshot();
    wrapper.setState({ toggleForm: false });
  });
  it('toggleReviewForm should toggle toggleForm property in state', () => {
    expect(wrapper.state('toggleForm')).toEqual(false);
    wrapper.instance().toggleReviewForm();
    expect(wrapper.state('toggleForm')).toEqual(true);
  });
});