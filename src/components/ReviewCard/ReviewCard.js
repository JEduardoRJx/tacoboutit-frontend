import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class ReviewCard extends Component {
  renderReviews = () => {
    const reviews = this.props.taco.reviews;
    return reviews.map((review, i) => (
      <View key={`${review.review}${review.id}`}>
        <Text>{review.rating}</Text>
        <Text>{review.review}</Text>
      </View>
    ));
  }

  render() {
    const { taco } = this.props;
    console.log(taco);
    return (
      <View>
        <Text>{taco.type}</Text>
        { taco.average_rating === null ? <Text>No rating yet</Text> : <Text>{taco.average_rating}</Text>}
        {!this.props.taco.reviews.length ? <Text>Be the first to add a review</Text> : this.renderReviews()}
      </View>
    )
  }
}
