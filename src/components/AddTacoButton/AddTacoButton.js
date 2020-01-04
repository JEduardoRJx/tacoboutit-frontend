import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Picker } from 'react-native'

export default class AddTacoButton extends Component {
  state = { 
    showAddTaco: false,
    selectedType: 'carne asada',
  };

  handleSubmit = async () => {
    const { submitTaco, id } = this.props;
    const selectedType = this.state.selectedType;
    const result = await submitTaco(selectedType, id);
    console.log(result);
    this.setState({ showAddTaco: false });
  }

  render() {
    return (
      <TouchableOpacity style={styles.addTacoButton} onPress={() => this.setState({showAddTaco: !this.state.showAddTaco })}>
        <Text style={styles.addTacoText}>+ Taco</Text>
        <Modal 
          visible={this.state.showAddTaco} 
          animationType="slide"
          onRequestClose={() => this.setState({ showAddTaco: false })}
        >
          <Text>Welcome to this awesome modal!</Text>
          <Text>Select Type</Text>
          <Picker
            selectedValue={this.state.selectedType}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({selectedType: itemValue});
              console.log(this.state.selectedType);
            }
            }>
            <Picker.Item label="Carne Asada" value="carne asada" />
            <Picker.Item label="Al Pastor" value="al pastor" />
            <Picker.Item label="Cabeza" value="cabeza" />
            <Picker.Item label="Cabeza" value="cabeza" />
            <Picker.Item label="Carnitas" value="carnitas" />
          </Picker>
          <Button title="Submit" onPress={() => this.handleSubmit()}/>
        </Modal>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  addTacoButton: {
    width: 100, 
    height: 50, 
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTacoText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
})

