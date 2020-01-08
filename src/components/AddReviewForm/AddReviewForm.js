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
    let { tacoId, rating, review } = this.state
    let response;
    const { updateLocalReviews } = this.props
    if(this.state.review === '') {
      response = await addReview(tacoId, rating)
      if(!response.ok) {
        this.setState({error: 'Failed to post review'})
      }
    } else {
      response = await addReview(tacoId, rating, review)
      if(!response.ok) {
        this.setState({error: 'Failed to post review'})
      }
    }
    updateLocalReviews(response)
  }

  render() {
    return (
      <View style={{height: '30%', backgroundColor: 'green', justifyContent: 'space-around'}}>
        {/* <Text>Add Review</Text> */}
        {/* <Text>Type:</Text> */}
        {/* <Picker
          onValueChange={(itemValue, itemIndex) => this.handleTacoTypeChange(itemValue, itemIndex)}>{this.renderTacoTypes()}</Picker> */}
        {/* <Text>Rating:</Text> */}
        {/* <Picker 
        selectedValue={this.state.rating}
        onValueChange={(itemValue) => this.handleRatingChange(itemValue)}
        >{this.renderRatings()}</Picker> */}
        {/* <TextInput
          multiline={true}
          numberOfLines={4}
          maxLength={50}
          placeholder='Add A Review'
          onChangeText={(text) => {
            this.setState({review: text})
          }}
          /> */}
          {/* <Button title='submit' /> */}
        {/* <TouchableOpacity onPress={() => this.submitNewReview()} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>SUBMIT</Text>
          </TouchableOpacity> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {flex: 1, backgroundColor: '#00BFFF', width: '100%', justifyContent: 'center'}
})