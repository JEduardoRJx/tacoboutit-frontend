import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Linking, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import ReviewCard from '../ReviewCard/ReviewCard';
import AddReviewForm from '../AddReviewForm/AddReviewForm'

export default class ReviewsPages extends Component {
  state = {
    toggleForm: false,
  }

  renderReviewCards = () => {
    const { tacos } = this.props;
    return tacos.map((taco) => {
      return <ReviewCard taco={taco} key={taco.id}/>;
    });
  }

  toggleReviewForm = () => {
    this.setState({toggleForm: !this.state.toggleForm})
  }
  
  render() {
    const { tacos, updateLocalReviews } = this.props;
    return (
      <ScrollView style={{height: Dimensions.get('window').height}}>
        <View style={{height: Dimensions.get('window').height}}>
          {this.renderReviewCards()}
          <TouchableOpacity onPress={() => this.toggleReviewForm ()}>
            <View style={{height: 50, backgroundColor: '#00BFFF', width: '100%'}}>
              {this.state.toggleForm === true ? <Text style={{color: 'white', fontSize: 16}}>Cancel</Text> : <Text style={{color: 'white', fontSize: 16}}>+ Review</Text>}
            </View>
          </TouchableOpacity>
          {(this.state.toggleForm && tacos.length > 0) &&  <AddReviewForm tacos={tacos} updateLocalReviews={updateLocalReviews} />}
        </View>
      </ScrollView>
    )
  }
}
