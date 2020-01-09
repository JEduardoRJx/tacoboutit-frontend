import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';

export default class SplashPage extends Component {
  state = {
    search: '',
    isLoading: true,
  };

  componentDidMount = async () => {
    await Font.loadAsync({
      'molle': require('../../../assets/fonts/Molle-Regular.ttf'),
    })
    this.setState({ isLoading: false });
  }

  render() {
    const fontFamily = this.state.isLoading ? null : { fontFamily: 'molle' };
    const dynamicStyles = [styles.header, fontFamily];
    return (
      <LinearGradient 
        colors={["#F0CB35", "#D56C2C", "#C02425"]}  
        style={styles.splashContainer}
      >
        <View style={styles.headerContainer}>
          <Text style={dynamicStyles}>Taco</Text> 
          <Text style={dynamicStyles}>BoutIt</Text> 
        </View>
        <ActivityIndicator size="large" color="#fff" animating={this.props.isLoading}/>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  splashContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 5,
  },
  header: {
    fontSize: 100,
    color: 'white',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})

