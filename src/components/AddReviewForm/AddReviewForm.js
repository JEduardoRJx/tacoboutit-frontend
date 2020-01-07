import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Linking, TouchableOpacity, ScrollView, Modal, Button, Picker } from 'react-native';

export default class AddReviewForm extends Component {

  renderTacoTypes = () => {
    const { tacos } = this.props
    return tacos.map(taco => <Picker.Item label={taco.type} value={taco.type.toLowerCase()} />)
  }

  renderRatings = () => {
    let ratings = [];
    for(let i = 1; i <= 10; i++) {
      if (i !== 10) {
        ratings.push(<Picker.Item label={String(i)} value={i} />)
        ratings.push(<Picker.Item label={String(i + .5)} value={i + .5} />)
        
      } else {
        ratings.push(<Picker.Item label={String(i)} value={i} />)
      }
    }
    return ratings
  }

  render() {
    return (
      <View style={{flex: 2}}>
        <Text>Add Review</Text>
        <Text>Type:</Text>
        <Picker>{this.renderTacoTypes()}</Picker>
        <Text>Rating:</Text>
        <Picker>{this.renderRatings()}</Picker>
      </View>
    )
  }
}