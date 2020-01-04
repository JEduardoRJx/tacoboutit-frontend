import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class TacoCard extends Component {
  render() {
    const { type } = this.props;
    return (
      <View>
        <Text>{type}</Text>
      </View>
    )
  }
}


// Object {
//   "id": 7,
//   "restaurant": 6,
//   "type": "al pastor",
// },