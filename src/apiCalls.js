export const getRestaurants = async (lat = 39.7392, lng = -104.9903) => {
  const response = await fetch(`https://tacoboutit-test.herokuapp.com/api/v1/restaurants/?lat=${lat}?lng=${lng}`);
  if(!response.ok) {
    throw Error('Failed to fetch resaurants near you');
  }
  return response.json();
}
