import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Linking, TouchableOpacity } from 'react-native';
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
        <Image
            style={styles.img}
            source={{ uri: restaurant.image_url }}/>
        <View style={styles.restaurantInfoContainer}>
          <Text style={styles.header}>{restaurant.name}</Text>
          <Text style={styles.restaurantInfo}>{restaurant.address}</Text>
          {/* <Text style={{ backgroundColor: 'white', borderRadius: 25, width: 200, fontSize: 24,}} 
            onPress={()=>{Linking.openURL(`tel:${restaurant.phone}`)}}>
            {restaurant.phone}
          </Text>  */}
          <TouchableOpacity 
            onPress={() => Linking.openURL(`tel:${restaurant.phone}`)}
            style={{backgroundColor: 'blue', flex: 1 }}
          >
            <Image
              style={{width: 40, height: 40}}
              source={callIcon}
            />
          </TouchableOpacity>
          <View style={styles.statusBubble}>
            <Text style={{ color, textAlign: 'center', fontSize: 16 }}>{status}</Text>
          </View>
          {tacos.length && <View>{this.renderTacos()}</View>}
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
    padding: 10,
  },
  header: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  restaurantInfo: {
    fontSize: 22,
    color: 'white',
  },
  statusBubble: {
    width: 70,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
  }
})