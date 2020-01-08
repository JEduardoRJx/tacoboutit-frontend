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
    const rating = taco.average_rating === null ? <Text>No ratings yet</Text> : <Text>{taco.average_rating}/10 Avg.</Text>
    return (
      <View style={{backgroundColor: 'lightblue'}}>
        <View style={{backgroundColor: 'blue', marginTop: 15}}>
          <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
            <Text style={styles.textHeader}>{taco.type.toUpperCase()}</Text>
            <Text style={styles.textHeader}>{rating}</Text>
            </View>
          </View>
          <View style={{backgroundColor: 'green', padding: 10}}>
            {!this.props.taco.reviews.length ? <Text>Be the first to add a review</Text> : this.renderReviews()}
          </View>
        {/* <Text style={{backgroundColor: 'tomato', textAlign: 'center', color: 'white', justifyContent: 'space-between', fontSize: 22}}>{taco.type.toUpperCase()} {rating}</Text> */}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  textHeader: {
    // backgroundColor: 'tomato', 
    textAlign: 'center', color: 'white', justifyContent: 'space-between', fontSize: 22, flex: 1, fontWeight: 'bold'}
})