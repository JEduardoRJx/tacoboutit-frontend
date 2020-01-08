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
    this.resetStateCloseModal();
    updateLocalReviews(response)
  }

  resetStateCloseModal = () => {
    const initialState = {
      tacoId: this.props.tacos[0].id,
      rating: 1,
      review: '',
      type: this.props.tacos[0].type, 
      error: ''
    };
    this.setState(initialState);
    this.props.toggleReviewForm();
  }

  render() {
    const { toggleReviewForm } = this.props;
    return (
      <View style={{flex: 4, backgroundColor: '#DCDCDC', justifyContent: 'space-around'}}>
        <View style={{flex: 1.25, flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 16}}>Select Taco Type</Text>
            <Picker selectedValue={this.state.type}
              onValueChange={
                (itemValue, itemIndex) => this.handleTacoTypeChange(itemValue, itemIndex)
              }>
                {this.renderTacoTypes()}
            </Picker>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 16}}>Select Rating</Text>
            <Picker selectedValue={this.state.rating} 
              onValueChange={
                (itemValue) => this.handleRatingChange(itemValue)
              }>
              {this.renderRatings()}
            </Picker>
          </View>
        </View>
        <View style={{backgroundColor: 'white', flex: 1, paddingHorizontal: 20}}>
              <TextInput
              style={{ fontSize: 16}}
          multiline={true}
          numberOfLines={4}
          maxLength={50}
          placeholder='Add A Review'
          onChangeText={(text) => {
            this.setState({review: text})
          }}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => this.submitNewReview()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {backgroundColor: '#DCDCDC', flex: 1, flexDirection: 'row', justifyContent: 'space-around'},
  buttonStyle: {width: '70%',
  height: '80%', backgroundColor: '#00BFFF', justifyContent: 'center', alignContent: 'center', borderRadius: 50},
  buttonText: {textAlign: 'center', color: 'white', fontSize: 24},
})