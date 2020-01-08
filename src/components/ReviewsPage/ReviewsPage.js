import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Linking, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import ReviewCard from '../ReviewCard/ReviewCard';
import AddReviewForm from '../AddReviewForm/AddReviewForm';
import { LinearGradient } from "expo-linear-gradient";


export default class ReviewsPages extends Component {
  state = {
    toggleForm: false
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

  toggleAddReviewButton = (tacos) => {
    if(tacos.length) {
      return (
        <TouchableOpacity onPress={() => this.toggleReviewForm ()} style={styles.buttonStyle}>
          {this.state.toggleForm ? <Text style={styles.buttonTextStyle}>Cancel</Text> : <Text style={styles.buttonTextStyle}>Add Review</Text>}
        </TouchableOpacity>
      )
    } else {
      return (<Text style={{height: '10%', backgroundColor: 'red'}}>Nothing To Review</Text>)
    }
  }
  
  render() {
    const { tacos, updateLocalReviews } = this.props;
    const reviewHeight = this.state.toggleForm ? '60%' : '90%'
    return (
      <LinearGradient
        colors={["#F0CB35", "#D56C2C", "#C02425"]}
        style={styles.container}
      >
        <View style={{height: reviewHeight}}>
          {this.renderReviewCards()}
        </View>
        {(this.state.toggleForm && tacos.length > 0) && <AddReviewForm tacos={tacos} updateLocalReviews={updateLocalReviews} />}
        {this.toggleAddReviewButton(tacos)}
      </LinearGradient>
    )
  }
}


const styles = StyleSheet.create({
  container: {height: Dimensions.get('window').height},
  buttonStyle: {height: '10%', backgroundColor: '#00BFFF', width: '100%', justifyContent: 'flex-end', padding: 10, 
  alignItems: 'center', flex: 1},
  buttonTextStyle: {color: 'white', fontSize: 32}

})