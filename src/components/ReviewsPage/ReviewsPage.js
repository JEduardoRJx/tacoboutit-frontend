import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Linking, TouchableOpacity, ScrollView, Modal } from 'react-native';
import ReviewCard from '../ReviewCard/ReviewCard';
export default class ReviewsPages extends Component {
  renderReviewCards = () => {
    const { tacos } = this.props;
    return tacos.map((taco) => {
      return <ReviewCard taco={taco} key={taco.id}/>;
    });
  }
  
  render() {
    const { tacos } = this.props;
    return (
      <ScrollView>
      <View>
        {this.renderReviewCards()}
      </View>
      </ScrollView>
    )
  }
}
