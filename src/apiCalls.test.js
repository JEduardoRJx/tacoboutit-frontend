import { getRestaurants, newTaco } from './apiCalls';
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
    const expected = 'https://tacoboutit-test.herokuapp.com/api/v1/restaurants/retrieve/?lat=39.7392&lng=-104.9903';
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
    const expectedUrl = 'https://tacoboutit-test.herokuapp.com/api/v1/tacos/new/';
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
})