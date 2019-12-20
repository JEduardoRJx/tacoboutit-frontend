import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { mockRestaurants } from "./mockRestaurants";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import RestaurantCard from './src/components/RestaurantCard/RestaurantCard';
import TacoSearch from './src/components/TacoSearch/TacoSearch';
import SplashPage from './src/components/SplashPage/SplashPage';
import { getRestaurants } from './src/apiCalls';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

class App extends Component {
  state = {
    showModal: false,
    selectedRestaurant: null,
    restaurants: null,
    error: '',
    location: null,
    isLoading: true,
  };

  // componentDidMount = async () => {
  //   try {
  //     const location = await this._getLocationAsync();
  //     const lat = location.coords.latitude;
  //     const lng = location.coords.longitude;
  //     const restaurants = await getRestaurants(lat, lng);
  //     restaurants.sort((a, b) => a.distance - b.distance)
  //     this.setState({ restaurants, isLoading: false });
  //   } catch {
  //     console.log('error detected');
  //     const restaurants = await getRestaurants();
  //     this.setState({ error: 'Failed to get tacos by location', restaurants, isLoading: false });
  //   }
  // }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        error: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    return location;
  };

  handlePress = (id) => {
    const selectedRestaurant = this.state.restaurants.find((rest) => rest.id === id);
    this.setState({ showModal: true, selectedRestaurant });
  }
 
  render() {
    return (
      <LinearGradient
        colors={["#F0CB35", "#D56C2C", "#C02425"]}
        style={styles.container}
      >
        <TacoSearch />
        {this.state.restaurants && <FlatList data={this.state.restaurants} 
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <RestaurantCard
          id={item.id}
          name={item.name}
          address={item.address}
          isClosed={item.is_closed}
          distance={item.distance}
          img={item.image_url}
          handlePress={this.handlePress}
          // key={item => item}
      />} />
      }
        <Modal 
          visible={this.state.showModal}
          animationType="fade"
          onRequestClose={() => {
            this.setState({ showModal: false, selectedRestaurant: null });
          }}
        >
          {this.state.selectedRestaurant && <Text>{this.state.selectedRestaurant.name}</Text>}
        </Modal>
        {this.state.isLoading && <SplashPage isLoading={this.state.isLoading}/> }
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
