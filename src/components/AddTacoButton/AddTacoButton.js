import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Picker, Dimensions } from 'react-native'

export default class AddTacoButton extends Component {
  state = { 
    showAddTaco: false,
    selectedType: 'carne asada',
  };

  handleSubmit = async () => {
    const { submitTaco, id } = this.props;
    const selectedType = this.state.selectedType;
    const result = await submitTaco(selectedType, id);
    this.setState({ showAddTaco: false });
  }

  render() {
    return (
      <TouchableOpacity style={styles.addTacoButton} onPress={() => this.setState({showAddTaco: !this.state.showAddTaco })}>
        <Text style={styles.addTacoText}>+ Taco</Text>
        <Modal 
          transparent={true}
          visible={this.state.showAddTaco} 
          animationType="slide"
          onRequestClose={() => this.setState({ showAddTaco: false })}
        >
          <View style={styles.addTacoModal} >
            <Text style={{fontSize: 24}}>Add New Taco</Text>
            <Text style={{fontSize: 24}}>Select Type</Text>
            <Picker
              selectedValue={this.state.selectedType}
              style={{height: 50, width: '100%'}}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({selectedType: itemValue});
              }
              }>
              <Picker.Item label="Carne Asada" value="carne asada" />
              <Picker.Item label="Al Pastor" value="al pastor" />
              <Picker.Item label="Cabeza" value="cabeza" />
              <Picker.Item label="Carnitas" value="carnitas" />
              <Picker.Item label="Vegan" value="vegan" />
            </Picker>
            <TouchableOpacity 
              onPress={() => this.handleSubmit()}>
                <View style={styles.buttonStyle}>
                  <Text style={{color: 'white', fontSize: 16}}>Submit</Text>
                </View>
              </TouchableOpacity>
          </View>
        </Modal>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  addTacoButton: {
    width: 100, 
    height: 40, 
    backgroundColor: 'lightgray',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 5,
    top: 220,
    right: 10,

  },
  addTacoText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addTacoModal: {
    width: Dimensions.get('window').width * 0.8, 
    height: Dimensions.get('window').height * 0.5,
    position: 'absolute',
    top: Dimensions.get('window').height * 0.25, 
    left: Dimensions.get('window').width * 0.1,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    justifyContent: 'space-around'
  },
  addTacoModalText: {
    fontSize: 24,
  },
  buttonStyle: {
    height: 50, 
    backgroundColor: '#00BFFF', 
    width: 200, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 30
  }
})


