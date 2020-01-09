import React from 'react';
import AddReviewForm from './AddReviewForm';
import { shallow } from 'enzyme';
import * as api from '../../apiCalls';

describe('AddReviewForm', () => {
  const mockToggleReviewForm = jest.fn();
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
  const mockUpdateLocalReviews = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<AddReviewForm 
      tacos={mockTacos} 
      updateLocalReviews={mockUpdateLocalReviews}
      toggleReviewForm={mockToggleReviewForm}
    />);
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
    const initialExpectedState = {"rating": 1, "review": "", "tacoId": 9, "type": "Testing testing", error: "" };
    expect(wrapper.state()).toEqual(initialExpectedState);
    const expectedState = {"rating": 1, "review": "", "tacoId": 9, "type": "new type", error: "" };
    wrapper.instance().handleTacoTypeChange('new type', 0);
    expect(wrapper.state()).toEqual(expectedState);
  });
  it('submitTacoReview should post new review to the backend and update local reviews when review is missing', async () => {
    api.addReview = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: true });
    });
    await wrapper.instance().submitNewReview();
    expect(api.addReview).toHaveBeenCalledWith(9, 1);
    expect(mockUpdateLocalReviews).toHaveBeenCalledWith({ ok: true });
  });
  it('submitTacoReview should post new review to the backend and update local reviews when review is present', async () => {
    api.addReview = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: true });
    });
    wrapper.setState({ review: 'This is a test review' });
    await wrapper.instance().submitNewReview();
    expect(api.addReview).toHaveBeenCalledWith(9, 1, 'This is a test review');
    expect(mockUpdateLocalReviews).toHaveBeenCalledWith({ ok: true });
  });
  it('submitTacoReview should set error in state if adding a new review fails', async () => {
    api.addReview = jest.fn().mockImplementation(() => Promise.resolve({ ok: false }));
    await wrapper.instance().submitNewReview();
    expect(wrapper.state('error')).toEqual('Failed to post review');
    wrapper.setState({ review: 'This is a test review', error: '' });
    expect(wrapper.state('error')).toEqual('');
    await wrapper.instance().submitNewReview();
    expect(wrapper.state('error')).toEqual('Failed to post review');
  });
});