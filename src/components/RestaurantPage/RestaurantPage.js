import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Linking } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

export default class RestaurantPage extends Component {
  render() {
    const { restaurant } = this.props;
    const status = restaurant.isClosed ? 'Closed' : 'Open';
    const color = restaurant.isClosed ? 'red': 'green';
    return (
      <LinearGradient
        colors={["#F0CB35", "#D56C2C", "#C02425"]}
        style={styles.container}>
        <Image
            style={styles.img}
            source={{ uri: restaurant.image_url }}/>
        <View style={styles.restaurantInfoContainer}>
          <Text style={styles.header}>{restaurant.name}</Text>
          <Text style={styles.restaurantInfo}>{restaurant.address}</Text>
          <Text style={styles.restaurantInfo} 
            onPress={()=>{Linking.openURL(`tel:${restaurant.phone}`)}}>
            {restaurant.phone}
          </Text> 
          <View style={styles.statusBubble}>
            <Text style={{ color, textAlign: 'center', fontSize: 16 }}>{status}</Text>
          </View>
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * .5
  },
  restaurantInfoContainer: {
    flex: 2,
    padding: 10
  },
  header: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  restaurantInfo: {
    fontSize: 22,
    color: 'white'
  },
  statusBubble: {
    width: 70,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
  }
})