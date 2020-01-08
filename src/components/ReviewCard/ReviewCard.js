import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'

export default class ReviewCard extends Component {
  renderReviews = () => {
    const reviews = this.props.taco.reviews;
    return reviews.map((review, i) => (
      <View key={`${review.review}${review.id}`}>
        <Text>Rating: {review.rating}/10</Text>
        <Text>{review.review}</Text>
      </View>
    ));
  }

  render() {
    const { taco } = this.props;
    const rating = taco.average_rating === null ? <Text>No ratings yet</Text> : <Text>Avg Rating: {taco.average_rating}/10</Text>
    return (
      <View style={{backgroundColor: 'lightblue'}}>
        <Text style={{backgroundColor: 'tomato', textAlgin: 'center'}}>{taco.type.toUpperCase()} {rating}</Text>
        {/* { taco.average_rating === null ? <Text>No ratings yet</Text> : <Text>Average Rating: {taco.average_rating}/10</Text>} */}
        {!this.props.taco.reviews.length ? <Text>Be the first to add a review</Text> : this.renderReviews()}
      </View>
    )
  }
}

const styles = StyleSheet.create({

})