import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Linking, TouchableOpacity, ScrollView, Modal, Button, KeyboardAvoidingView } from 'react-native';
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
      return (<Text style={{color: 'white', fontSize: 32, textAlign: 'center'}}>Nothing To Review</Text>)
    }
  }
  
  render() {
    const { tacos, updateLocalReviews } = this.props;
    const reviewHeight = this.state.toggleForm ? 1 : 9
    return (
      
      <LinearGradient
        colors={["#F0CB35", "#D56C2C", "#C02425"]}
        style={styles.container}
      >
        
        <View style={{flex: reviewHeight, backgroundColor: 'green'}}>
          {/* {this.renderReviewCards()} */}
        </View>
        <KeyboardAvoidingView style={{flex: 1}}
          behavior="padding" 
        >
          {(this.state.toggleForm && tacos.length > 0) && <AddReviewForm tacos={tacos} updateLocalReviews={updateLocalReviews} />}
          {this.toggleAddReviewButton(tacos)}
        </KeyboardAvoidingView>
      </LinearGradient>
    )
  }
}


const styles = StyleSheet.create({
  container: {height: Dimensions.get('window').height},
  buttonStyle: {flex: 1, backgroundColor: '#00BFFF', width: '100%', justifyContent: 'center', 
  alignItems: 'center'},
  buttonTextStyle: {color: 'white', fontSize: 32},
})