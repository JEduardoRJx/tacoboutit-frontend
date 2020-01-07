import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Linking, TouchableOpacity, ScrollView, Modal, Button, Picker, TextInput } from 'react-native';
import { addReview } from '../../apiCalls'

export default class AddReviewForm extends Component {
  state = {
    tacoId: this.props.tacos[0].id,
    rating: 1,
    review: '',
    type: this.props.tacos[0].type, 
    error: ''
  }

  renderTacoTypes = () => {
    const { tacos } = this.props
    return tacos.map(taco => <Picker.Item label={taco.type} value={taco.type.toLowerCase()} key={taco.id} />)
  }

  renderRatings = () => {
    let ratings = [];
    for(let i = 1; i <= 10; i++) {
      if (i !== 10) {
        ratings.push(<Picker.Item label={String(i)} value={i} key={i}/>)
        ratings.push(<Picker.Item label={String(i + .5)} value={i + .5} key={i}/>)
        
      } else {
        ratings.push(<Picker.Item label={String(i)} value={i} key={i}/>)
      }
    }
    return ratings
  }

  handleTacoTypeChange = (itemValue, itemIndex) => {
    const id = this.props.tacos[itemIndex].id
    this.setState({tacoId: id, type: itemValue})
  }

  handleRatingChange = (itemValue) => {
    this.setState({rating: Number(itemValue)})
  }

  submitNewReview = async () => {
    const { tacoId, rating, review } = this.state
    console.log('ay', tacoId, rating, review)
    const response = await addReview(tacoId, rating, review)
    if(!response.ok) {
      this.setState({error: 'Failed to post review'})
    }
  }

  render() {
    return (
      <View style={{flex: 2}}>
        <Text>Add Review</Text>
        <Text>Type:</Text>
        <Picker
          onValueChange={(itemValue, itemIndex) => this.handleTacoTypeChange(itemValue, itemIndex)}>{this.renderTacoTypes()}</Picker>
        <Text>Rating:</Text>
        <Picker 
        selectedValue={this.state.rating}
        onValueChange={(itemValue) => this.handleRatingChange(itemValue)}
        >{this.renderRatings()}</Picker>
        <Text>Review:</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          maxLength={50}
          placeholder='Add A Review'
          onChangeText={(text) => {
            this.setState({review: text})
          }}
          />
        <Button onPress={() => this.submitNewReview()} title='Submit' />
      </View>
    )
  }
}