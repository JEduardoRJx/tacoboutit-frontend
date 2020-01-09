import { getRestaurants, newTaco, addReview } from './apiCalls';
import { mockRestaurants } from '../mockRestaurants';

describe('getRestaurants', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRestaurants),
      })
    });
  })
  it('should be called with the correct url', () => {
    const expected = 'https://tacoboutit-backend.herokuapp.com/api/v1/restaurants/retrieve/?lat=39.7392&lng=-104.9903';
    getRestaurants();
    expect(window.fetch).toHaveBeenCalledWith(expected);
  });
  it('should return an array of restaurants', async() => {
    const result = await getRestaurants();
    expect(result).toEqual(mockRestaurants);
  });
  it('should return an error if the fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: false });
    });
    try{
      const result = await getRestaurants();
    } catch(error) {
      expect(error).toEqual(Error('Failed to fetch restaurants near you'));
    }
  });
  it('should return an error if the promise rejects', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Failed to fetch'));
    });
    try{
      const result = await getRestaurants();
    } catch(error) {
      expect(error).toEqual(Error('Failed to fetch'));
    }
  })
});

describe('newTaco', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: "carne asada added to Taquería El Trompito" }),
      })
    });
  })
  it('should be called with the correct url and body', async () => {
    const expectedBody = {
      "body": "{\"type\":\"carne asada\",\"restaurant\":1}",
      "headers": {
        "content-type": "application/json",
      },
      "method": "POST",
    };
    const expectedUrl = 'https://tacoboutit-backend.herokuapp.com/api/v1/tacos/new/';
    await newTaco('carne asada', 1);
    expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedBody);
  });
  it('should return a successful message if the new taco posts', async() => {
    const expectedResponse = { success: 'carne asada added to Taquería El Trompito' };
    const result = await newTaco('carne asada', 1);
    expect(result).toEqual(expectedResponse);
  });
  it('should return an error if the fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: false });
    });
    const result = await newTaco('carne asada', 2);
    expect(result).toEqual(Error('Failed to add taco.'));
  });
  it('should return an error if the promise rejects', async() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Failed to post taco'));
    });
    try {
      const result = await newTaco('beef', 2);
    } catch(error) {
      expect(error).toEqual(Error('Failed to post taco'));
    }
  });
});

describe('addReview', () => {
  const mockResponse = { 
    "taco": 9,
    "rating": 4,
    "review": "meh"
  };
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    });
  });
  it('should be called with the correct url and body', async () => {
    const expectedBody = {
      "body": "{\"taco\":1,\"rating\":10,\"review\":\"Test Review\"}",
      "headers": {
        "content-type": "application/json",
      },
      "method": "POST",
    };
    const expectedUrl = 'https://tacoboutit-backend.herokuapp.com/api/v1/reviews/';
    await addReview(1, 10, 'Test Review');
    expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedBody);
  });
  it('should be called with the correct body if review is not supplied', async () => {
    const expectedUrl = 'https://tacoboutit-backend.herokuapp.com/api/v1/reviews/';
    const expectedBody = {
      "body": "{\"taco\":2,\"rating\":5.5,\"review\":\"No Review Available\"}",
      "headers": {
        "content-type": "application/json",
      },
      "method": "POST",
    };
    await addReview(2, 5.5);
    expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedBody);
  });
  it('should return a review object if the response is successful', async () => {
    const response = await addReview(1, 10, 'Test Review');
    expect(response).toEqual(mockResponse);
  });
  it('should return an error if the fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: false });
    });
    const response = await addReview(1, 10, 'Test Review');
    expect(response).toEqual(Error('Failed to add review'));
  }); 
  it('should return an error if the promise rejects', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Failed to add review'));
    });
    try {
      addReview(1, 10, 'Test Review');
    } catch(error) {
      expect(error).toEqual(Error('Failed to add review'));
    }
  });
});