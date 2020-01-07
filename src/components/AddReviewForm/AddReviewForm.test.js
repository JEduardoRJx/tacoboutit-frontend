import React from 'react';
import AddReviewForm from './AddReviewForm';
import { shallow } from 'enzyme';

describe('AddReviewForm', () => {
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
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddReviewForm tacos={mockTacos} />);
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handleRatingChange should update state with a new rating', () => {
    expect(wrapper.state('rating')).toEqual(1);
    wrapper.instance().handleRatingChange(5.5);
    expect(wrapper.state('rating')).toEqual(5.5);
  });

  it('handleTacoTypeChange should update props tacoId and type in state', () => {
    const initialExpectedState = {"rating": 1, "review": "", "tacoId": 9, "type": "Testing testing"};
    expect(wrapper.state()).toEqual(initialExpectedState);
    const expectedState = {"rating": 1, "review": "", "tacoId": 9, "type": "new type"};
    wrapper.instance().handleTacoTypeChange('new type', 0);
    expect(wrapper.state()).toEqual(expectedState);
  });
});