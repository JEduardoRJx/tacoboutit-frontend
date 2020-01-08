import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'

export default class ReviewCard extends Component {
  renderReviews = () => {
    const reviews = this.props.taco.reviews;
    return reviews.map((review, i) => (
      <View key={`${review.review}${review.id}`} style={styles.individualReview}>
        <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>{review.rating}/10</Text>
        <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>{review.review}</Text>
      </View>
    ));
  }

  render() {
    const { taco } = this.props;
    const rating = taco.average_rating === null ? <Text>No ratings yet</Text> : <Text>{taco.average_rating}/10 Avg.</Text>
    return (
      <View style={styles.reviewCardStyling}>
        <View style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
          <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
            <Text style={styles.textHeader}>{taco.type.toUpperCase()}</Text>
            <Text style={styles.textHeader}>{rating}</Text>
            </View>
          </View>
          <View style={{ padding: 10}}>
            {!this.props.taco.reviews.length ? <Text>Be the first to add a review</Text> : this.renderReviews()}
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  reviewCardStyling: {backgroundColor: 'rgba(225, 225, 225, 0.3)', marginTop: 15, margin: 20, borderRadius: 20, overflow: 'hidden'},
  textHeader: {
    textAlign: 'center', color: 'white', justifyContent: 'space-between', fontSize: 22, flex: 1, fontWeight: 'bold'},
    individualReview: { borderBottomColor: 'rgba(0, 0, 0, 0.3)', borderBottomWidth: 2, borderRadius: 30, marginBottom: 20, alignItems: 'center'}
})