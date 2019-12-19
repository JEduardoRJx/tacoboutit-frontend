import React, { Component } from 'react'
import { Text, View, Image, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Card, CardItem } from 'native-base';

export default class RestaurantCard extends Component {
  render() {
    const { name, address, city, state, zipcode, isClosed, distance, img, handlePress } = this.props;
    const status = isClosed ? 'Closed' : 'Open';
    const color = isClosed ? 'red': 'green';
    return (
      <TouchableOpacity style={styles.cardContainer} onPress={() => handlePress(this.props.id)}>
         <Image
            style={styles.img}
            source={{ uri: img }}
          />
        <View style={styles.infoContainer}>
          <Text style={styles.header}>{name}</Text>
          <View style={styles.info}>
            <Text style={styles.text}>{address}</Text>
            <Text style={styles.text}>{city}, {state} {zipcode}</Text>
          </View>
          <View style={styles.statusBubble}>
            <Text style={{ color, textAlign: 'center', fontSize: 16 }}>{status}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>{distance} miles</Text>
            <Text style={styles.text}>Tap To View</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'rgba(225, 225, 225, 0.3)',
    flexDirection: 'row',
    height: Dimensions.get('window').height * .25,
    width: Dimensions.get('window').width * .9,
    borderRadius: 20,
    elevation: 0,
    overflow: 'hidden',
  },
  img: { width: Dimensions.get('window').height * .25, height: Dimensions.get('window').height * .25, flex: 2 },
  infoContainer: {
    flex: 3,
    justifyContent: 'space-evenly',
  },
  header: {
    color: 'white',
    fontSize: 22,
    textAlign: 'left',
    width: '100%',
    paddingLeft: 15,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  info: {
    textAlign: 'left',
    paddingLeft: 15,
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  statusBubble: {
    width: 70,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
  }
});