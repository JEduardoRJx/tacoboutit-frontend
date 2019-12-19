import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
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
          lightTheme={true}
          containerStyle={styles.searchBar}
          inputStyle={dynamicInputStyles}
        />
      
    )
  }
}

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 4,
    width: Dimensions.get('window').width * .9,
  },
  input: {
    textAlign: 'center',
    fontSize: 32,
  }
});

