import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import * as Font from 'expo-font';

export default class TacoSearch extends Component {
  state = {
    search: '',
  };
  handleChange = (search) => {
    this.setState({ search });
  }
  render() {
    const { search } = this.state;
    return (
        <SearchBar
          placeholder="Find Tacos..."
          onChangeText={this.handleChange}
          value={search}
          lightTheme={true}
          containerStyle={styles.searchBar}
          inputStyle={styles.input}
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
  }
});

