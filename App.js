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
import { getRestaurants } from './src/apiCalls';

class App extends Component {
  state = {
    showModal: false,
    selectedRestaurant: null,
    restaurants: null,
    error: '',
  };

  componentDidMount = async () => {
    try {
      const restaurants = await getRestaurants(1,2);
      this.setState({ restaurants });
    } catch {
      console.log('error detected');
      this.setState({ error: restaurants });
    }
  }

  handlePress = (id) => {
    const selectedRestaurant = mockRestaurants.find((rest) => rest.id === id);
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
          key={item.id}
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
