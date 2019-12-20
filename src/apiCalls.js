export const getRestaurants = async (lat, lng) => {
  const response = await fetch('https://staging-tacoboutit-be.herokuapp.com/api/restaurants/?lat=39.7392&lng=-104.9903');
  if(!response.ok) {
    throw Error('Failed to fetch resaurants near you');
  }
  return response.json();
}
