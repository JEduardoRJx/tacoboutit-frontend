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
    const expected = 'https://tacoboutit-test.herokuapp.com/api/v1/restaurants/?lat=39.7392?lng=-104.9903';
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