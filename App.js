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

class App extends Component {
  state = {
    showModal: false,
    selectedRestaurant: null,
  };

  handlePress = (id) => {
    const selectedRestaurant = mockRestaurants.find((rest) => rest.id === id);
    this.setState({ showModal: true, selectedRestaurant });
  }
 
  render() {
    console.log('state', this.state);
    return (
      <LinearGradient
        colors={["#F0CB35", "#D56C2C", "#C02425"]}
        style={styles.container}
      >
        <TacoSearch />
        <FlatList data={mockRestaurants} 
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <RestaurantCard
          id={item.id}
          name={item.name}
          address={item.location.address1}
          city={item.location.city}
          state={item.location.state}
          zipcode={item.location.zip_code}
          isClosed={item.is_closed}
          distance={item.distance}
          img={item.image_url}
          handlePress={this.handlePress}
          // key={`${item.name}${i}`}
      />} />
        <Modal 
          visible={this.state.showModal}
          animationType="fade"
          onRequestClose={() => {
            this.setState({ showModal: false });
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
