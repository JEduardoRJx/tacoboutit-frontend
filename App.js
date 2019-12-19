import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { mockRestaurants } from "./mockRestaurants";
import RestaurantCard from "./RestaurantCard";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

class App extends Component {
  renderRestaurantCards = () => {
    return mockRestaurants.map((rest, i) => {
      return (
        <RestaurantCard
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
      );
    });
  };
  renderCard = restaurant => {
    console.log(restaurant);
    return (
      <RestaurantCard
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
    );
  };
  render() {
    return (
      <LinearGradient
        colors={["#F0CB35", "#D56C2C", "#C02425"]}
        style={styles.container}
      >
        {this.renderRestaurantCards()}
        {/* <NavBar /> */}
      </LinearGradient>
    );
  }
}

class Tacos extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Taco Screen</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: App,
      navigationOptions: {
        tabBarIcon: () => (
          <Image
            source={require("./assets/home.png")}
            style={{ width: 40, height: 40 }}
          />
        )
      }
    },
    Tacos: {
      screen: Tacos,
      navigationOptions: {
        tabBarIcon: () => (
          <Image
            source={require("./assets/taco.png")}
            style={{ width: 40, height: 40 }}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeBackgroundColor: "rgba(0, 0, 0, .1)"
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default createAppContainer(TabNavigator);
