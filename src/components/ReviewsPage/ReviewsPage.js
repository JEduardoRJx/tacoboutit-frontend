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
      <View style={styles.container}>
        <View style={{flex: 10, backgroundColor: 'green'}}>
          {/* {this.renderReviewCards()}
          <TouchableOpacity onPress={() => this.toggleReviewForm ()}>
            <View style={{height: 50, backgroundColor: '#00BFFF', width: '100%'}}>
              {this.state.toggleForm === true ? <Text style={{color: 'white', fontSize: 16}}>Cancel</Text> : <Text style={{color: 'white', fontSize: 16}}>+ Review</Text>}
            </View>
          </TouchableOpacity>
          {(this.state.toggleForm && tacos.length > 0) &&  <AddReviewForm tacos={tacos} updateLocalReviews={updateLocalReviews} />} */}
        </View>
          <TouchableOpacity onPress={() => this.toggleReviewForm ()} style={styles.buttonStyle}>
            {this.state.toggleForm ? <Text style={styles.buttonTextStyle}>Cancel</Text> : <Text style={styles.buttonTextStyle}>Review</Text>}
          </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {height: Dimensions.get('window').height, backgroundColor: 'lightblue'},
  buttonStyle: {height: '100%', backgroundColor: '#00BFFF', width: '100%', justifyContent: 'center', 
  alignItems: 'center', flex: 1},
  buttonTextStyle: {color: 'white', fontSize: 32}

})