export const mockRestaurants = [
  {    
    id: 1,
    name: "Los Gallitos Taqueria",
    phone: "9701112222",
    is_closed: false,
    review_count:  1223,
    url:  "https:/www.yelp.com/biz/tacos-loco",
    coordinates: {
      latitude: 37.7670169511878,
      longitude: -122.4227194947,
    },
    image_url: "http://3.bp.blogspot.com/-DrHTc2nXjr0/TjRFkOVBNzI/AAAAAAAAB3Q/lqmOj92oNFM/s1600/P1160728.JPG",
    location: {
      city: "Denver",
      country: "US",
      state: "CO",
      address1: "2630 W Alemeda Ave",
      zip_code: "80219"
    },
    distance: 1.2,
    tacotime_item_review_count: 2,
  },
  {    
    id: 2,
    name: "Torchy's Tacos",
    phone: "9701112222",
    is_closed: true,
    review_count:  1223,
    url:  "https:/www.yelp.com/biz/tacos-loco",
    coordinates: {
      latitude: 37.7670169511878,
      longitude: -122.4227194947,
    },
    image_url: "data:image/jpeg;base64,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",
    location: {
      city: "Denver",
      country: "US",
      state: "CO",
      address1: "1085 N Broadway",
      zip_code: "80203"
    },
    distance: 0.7,
    tacotime_item_review_count: 2,
  },
  {    
    id: 3,
    name: "Tacos Junior",
    phone: "9701112222",
    is_closed: false,
    review_count:  1223,
    url:  "https:/www.yelp.com/biz/tacos-loco",
    coordinates: {
      latitude: 37.7670169511878,
      longitude: -122.4227194947,
    },
    image_url: "data:image/jpeg;base64,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",
    location: {
      city: "Denver",
      country: "US",
      state: "CO",
      address1: "1280 S Sheridan",
      zip_code: "80232"
    },
    distance: 3.1,
    tacotime_item_review_count: 2,
  },
  {    
    id: 4,
    name: "Tacos Junior",
    phone: "9701112222",
    is_closed: false,
    review_count:  1223,
    url:  "https:/www.yelp.com/biz/tacos-loco",
    coordinates: {
      latitude: 37.7670169511878,
      longitude: -122.4227194947,
    },
    image_url: "data:image/jpeg;base64,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",
    location: {
      city: "Denver",
      country: "US",
      state: "CO",
      address1: "1280 S Sheridan",
      zip_code: "80232"
    },
    distance: 3.1,
    tacotime_item_review_count: 2,
  },
  {    
    id: 5,
    name: "Tacos Junior",
    phone: "9701112222",
    is_closed: false,
    review_count:  1223,
    url:  "https:/www.yelp.com/biz/tacos-loco",
    coordinates: {
      latitude: 37.7670169511878,
      longitude: -122.4227194947,
    },
    image_url: "data:image/jpeg;base64,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",
    location: {
      city: "Denver",
      country: "US",
      state: "CO",
      address1: "1280 S Sheridan",
      zip_code: "80232"
    },
    distance: 3.1,
    tacotime_item_review_count: 2,
  }
]