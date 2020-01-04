import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import TacoCard from '../TacoCard/TacoCard';
const callIcon = require('../../../assets/call-answer.png');

export default class RestaurantPage extends Component {
  renderTacos = () => {
    const { tacos } = this.props.restaurant;
    return tacos.map((taco, i) => <TacoCard key={`${taco.type}-${i}`} type={taco.type} />);
  }

  render() {
    const { restaurant } = this.props;
    const tacos = restaurant.tacos;
    const status = restaurant.isClosed ? 'Closed' : 'Open';
    const color = restaurant.isClosed ? 'red': 'green';
    return (
      <LinearGradient
        colors={["#F0CB35", "#D56C2C", "#C02425"]}
        style={styles.container}>
        <View style={styles.statusBubble}>
            <Text style={{ color, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{status}</Text>
          </View>
        <Image
            style={styles.img}
            source={{ uri: restaurant.image_url }}/>
        <ScrollView>
          <View style={styles.restaurantInfoContainer}>
            <Text style={styles.header}>{restaurant.name}</Text>
            <Text style={styles.restaurantInfo}>{restaurant.address}</Text>
            <TouchableOpacity 
              onPress={() => Linking.openURL(`tel:${restaurant.phone}`)}
              style={styles.phoneBubble}
            >
              <Image
                style={{width: 40, height: 40}}
                source={callIcon}
              />
            </TouchableOpacity>
            {tacos.length !== 0 && <View>{this.renderTacos()}</View>}
          </View>
        </ScrollView>
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
    height: Dimensions.get('window').height * .4
  },
  restaurantInfoContainer: {
    flex: 2,
    padding: 10,
  },
  header: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  restaurantInfo: {
    fontSize: 22,
    color: 'white',
  },
  statusBubble: {
    width: 100,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 5,
    top: 10,
    right: 10,
  },
  phoneBubble: {
    backgroundColor: 'white', 
    width: Dimensions.get('window').width * .8, 
    height: 60, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 5,
  },
})