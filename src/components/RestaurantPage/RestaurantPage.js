import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Linking, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import TacoCard from '../TacoCard/TacoCard';
import AddTacoButton from '../AddTacoButton/AddTacoButton';
import ReviewsPage from '../ReviewsPage/ReviewsPage'
const callIcon = require('../../../assets/call-answer.png');

export default class RestaurantPage extends Component { 
  state = {
    showReviews: false,
  }

  renderTacos = () => {
    const { tacos } = this.props.restaurant;
    return tacos.map((taco, i) => <TacoCard key={`${taco.type}-${i}`} type={taco.type} />);
  }

  render() {
    const { restaurant, submitTaco, updateLocalReviews } = this.props;
    const id = restaurant.id;
    const tacos = restaurant.tacos;
    const status = restaurant.isClosed ? 'Closed' : 'Open';
    const color = restaurant.isClosed ? 'red': 'green';
    return (
      <LinearGradient
        colors={["#F0CB35", "#D56C2C", "#C02425"]}
        style={styles.container}>
        <View style={styles.statusBubble}>
            <Text style={{ color, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{status}</Text>
        </View>
        <AddTacoButton style={styles.addTacoButton} submitTaco={submitTaco} id={id}/>
        <Image
            style={styles.img}
            source={{ uri: restaurant.image_url }}/>
        <ScrollView>
          <View style={styles.restaurantInfoContainer}>
            <Text style={styles.header}>{restaurant.name}</Text>
            <Text style={styles.restaurantInfo}>{restaurant.address}</Text>
            <TouchableOpacity 
              onPress={() => Linking.openURL(`tel:${restaurant.phone}`)}
              style={styles.phoneBubble}
            >
              <Image
                style={{width: 40, height: 40}}
                source={callIcon}
              />
            </TouchableOpacity>
            {tacos.length !== 0 && <View>{this.renderTacos()}</View>}
            <TouchableOpacity onPress={() => this.setState({showReviews: true})}>
                <Modal visible={this.state.showReviews}
                  onRequestClose={() => this.setState({showReviews: false})}>
                  <ReviewsPage tacos={tacos} updateLocalReviews={updateLocalReviews} />
                </Modal>
                <View style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                  <Text style={styles.viewAllReviewsStyles}>View All Reviews</Text>
                </View>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * .4
  },
  restaurantInfoContainer: {
    flex: 2,
    padding: 10,
  },
  header: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  restaurantInfo: {
    fontSize: 22,
    color: 'white',
  },
  statusBubble: {
    width: 100,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 5,
    top: 10,
    right: 10,
  },
  phoneBubble: {
    backgroundColor: 'white', 
    width: Dimensions.get('window').width * .8, 
    height: 60, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 5,
  },
  viewAllReviewsStyles: {
    backgroundColor: '#00BFFF',
    color: 'white',
    height: 50,
    width: '70%',
    borderRadius: 30, 
    textAlign: 'center',
    fontSize: 24,
    textAlignVertical: 'center'
  }
})