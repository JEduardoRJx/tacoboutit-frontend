import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native'
const checkMarkImg = require('../../../assets/check-mark.png');

export default class TacoCard extends Component {
  render() {
    const { type } = this.props;
    return (
      <View style={styles.card}>
        <Text>{type}</Text>
        <Image 
          source={checkMarkImg}
          style={{ width: 30, height: 30, }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width * .75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  }
})