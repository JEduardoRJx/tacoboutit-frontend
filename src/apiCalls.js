export const getRestaurants = async (lat = 39.7392, lng = -104.9903) => {
  const response = await fetch(`https://tacoboutit-test.herokuapp.com/api/v1/restaurants/?lat=${lat}?lng=${lng}`);
  if(!response.ok) {
    throw Error('Failed to fetch restaurants near you');
  }
  return response.json();
}

export const newTaco = async (type, restaurant) => {
  const response = await fetch('https://tacoboutit-test.herokuapp.com/api/v1/tacos/new/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ type, restaurant }),
  });
  if(!response.ok) {
    return Error('Failed to add taco.');
  }
  const resp = await response.json();
  console.log(resp, '---response');
  return resp;
}
