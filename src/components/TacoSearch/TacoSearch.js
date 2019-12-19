import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import * as Font from 'expo-font';

export default class TacoSearch extends Component {
  state = {
    search: '',
    isLoading: true,
  };
  componentDidMount = async () => {
    await Font.loadAsync({
      'sign-painter': require('../../../assets/fonts/SignPainter-HouseScript.ttf')
    })
    this.setState({ isLoading: false });
  }
  handleChange = (search) => {
    this.setState({ search });
  }
  render() {
    const { search } = this.state;
    const fontFamily = this.state.isLoading ? null : { fontFamily: 'sign-painter' };
    const dynamicInputStyles = [styles.input, fontFamily];
    return (
        <SearchBar
          placeholder="Find Tacos..."
          onChangeText={this.handleChange}
          value={search}
          containerStyle={styles.searchBar}
          inputStyle={dynamicInputStyles}
          placeholderTextColor="black"
          searchIcon={<Image source={require('../../../assets/007-search.png')} style={{width: 45, height: 45}} />}
          inputContainerStyle={styles.inputContainer}
          leftIconContainerStyle={{ marginLeft: 10 }}
        />
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    width: Dimensions.get('window').width * .9,
    padding: 0,
    height: 60,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  input: {
    textAlign: 'center',
    fontSize: 38,
    width: '100%',
    height: '100%',
    marginLeft: 0,
    marginTop: 5,
  },
  inputContainer: { 
    backgroundColor: 'white', 
    alignItems: 'center', 
    height: '100%',
    borderRadius: 30,
  },
});

