import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { mockRestaurants } from './mockRestaurants';
import RestaurantCard from './src/components/RestaurantCard/RestaurantCard';

export default class App extends Component {
  renderRestaurantCards = () => {
    return mockRestaurants.map((rest, i) => {
      return <RestaurantCard
        name={rest.name}
        address={rest.location.address1}
        city={rest.location.city}
        state={rest.location.state}
        zipcode={rest.location.zip_code}
        isClosed={rest.is_closed}
        distance={rest.distance}
        img={rest.image_url}
        key={`${rest.name}${i}`}
      />
    });
  }
  renderCard = (restaurant) => {
    console.log(restaurant);
    return <RestaurantCard
        name={restaurant.name}
        address={restaurant.location.address1}
        city={restaurant.location.city}
        state={restaurant.location.state}
        zipcode={restaurant.location.zip_code}
        isClosed={restaurant.is_closed}
        distance={restaurant.distance}
        img={restaurant.image_url}
        key={`${restaurant.name}${i}`}
      />
  }
  render() {
    return (
      <LinearGradient
          colors={['#F0CB35', '#D56C2C', '#C02425']}
          style={styles.container}
      >
        {this.renderRestaurantCards()}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
