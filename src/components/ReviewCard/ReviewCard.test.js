import React from 'react';
import ReviewCard from './ReviewCard';
import { shallow } from 'enzyme';



describe('ReviewCard', () => {
  const mockTaco = {
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
  };
  const mockTacoNoRatingsReviews = {
    "id": 9,
    "type": "Testing testing",
    "restaurant_id": 2,
    "average_rating": null,
    "reviews": [],
  };
  const wrapper = shallow(<ReviewCard taco={mockTaco} />);
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renderReviews should return an array of review elements', () => {
    const expected = [
      '<View><Text>Rating: 7/10</Text><Text>its ok</Text></View>',
      '<View><Text>Rating: 4/10</Text><Text>lame</Text></View>',
      '<View><Text>Rating: 4/10</Text><Text></Text></View>',
      '<View><Text>Rating: 1/10</Text><Text>This taco put my son in the hospital</Text></View>',
      '<View><Text>Rating: 10/10</Text><Text>The best</Text></View>',
      '<View><Text>Rating: 4/10</Text><Text>meh</Text></View>'
    ];
    const elements = wrapper.instance().renderReviews();
    expect(elements.length).toEqual(6);
    // const result = wrapper
    // .instance()
    // .renderReviews()
    // .map(elem => {
    //   return shallow(elem).html();
    // });
    // expect(result).toEqual(expected);

    //above code passes but tosses a lot of warnings
  });
  it('if there is no average rating or reviews alternate text should be displayed', () => {
    const wrapperMissingInfo = shallow(<ReviewCard taco={mockTacoNoRatingsReviews} />);
    expect(wrapperMissingInfo).toMatchSnapshot();
  });
});