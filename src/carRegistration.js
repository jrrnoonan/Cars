import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Button, View, Platform, Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import {firstBy} from 'thenby';
import styles from './styles';
const localhost = 'http://192.168.137.136:8081/'

class carRegistration extends Component {

  //Sets title at top of page to Register Your Car 
  static navigationOptions =
  {
    title: 'Register Your Car',
  };

    //Creates 5 states, which will be used to hold the values entered in the TextInput Boxes  
    constructor(props) {
      super(props);

      this.state ={
        
        TextInput_Car_Make: '',
        TextInput_Car_Model: '',
        TextInput_Car_Year: '',
        TextInput_Car_Kilometers: '',
        TextInput_Car_Vin: '',
      }
    }

    //This function uses Fetch to send the data inserted in the text input to the server
 InsertCarRecordsToServers = () =>{
 
  fetch(localhost + 'insert', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({

    car_make : this.state.TextInput_Car_Make, 
    car_model : this.state.TextInput_Car_Model, 
    car_year : this.state.TextInput_Car_Year,
    car_kilometers: this.state.TextInput_Car_Kilometers, 
    car_vin : this.state.TextInput_Car_Vin

  })

  }).then((response) => response.json())
      .then((responseJson) => {

        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson);

      }).catch((error) => {
        console.error(error);
      });

}

//Function to go to the second page of the app 
GoTo_Show_CarList_Activity_Function = () =>
{
  this.props.navigation.navigate('Second');
  
}

 //Contains title, textbox, and buttons to be displayed on first page of app
 render() {
  return (

<View style={styles.MainContainer}>

           
      <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Car Registration Form </Text>
       
      <TextInput
       //Text to be displayed when box is empty 
        placeholder="Enter Car Make (e.g. Honda)"
       
       //Sets the text inserted inside the box to this.state.TextInput_Car_Make
        onChangeText={ TextInputValue => this.setState({ TextInput_Car_Make : TextInputValue }) }
         
         //Essentially turns off text underlining
        underlineColorAndroid='transparent'

        style={styles.TextInputStyleClass}
      />

     <TextInput
        
        placeholder="Enter Car Model (e.g. Civic)"

        onChangeText={ TextInputValue => this.setState({ TextInput_Car_Model : TextInputValue }) }

        underlineColorAndroid='transparent'

        style={styles.TextInputStyleClass}
      />

     <TextInput
        
        placeholder="Enter the car's Year (e.g. 1999)"

        onChangeText={ TextInputValue => this.setState({ TextInput_Car_Year : TextInputValue }) }

        underlineColorAndroid='transparent'

        style={styles.TextInputStyleClass}
      />

      <TextInput
        
        placeholder="Enter the car's Kilometers (e.g. 124999)"

        onChangeText={ TextInputValue => this.setState({ TextInput_Car_Kilometers : TextInputValue }) }

        underlineColorAndroid='transparent'

        style={styles.TextInputStyleClass}
      />

      <TextInput

        placeholder="Enter the car's vin Number e.g. (24dk2454ska)"

        onChangeText={ TextInputValue => this.setState({ TextInput_Car_Vin : TextInputValue }) }

        underlineColorAndroid='transparent'

        style={styles.TextInputStyleClass}
      />

      {/*Creates a button. When pressed, it calls the InsertCarRecordsToServers function. This sends the values in the 
       textbox to the server to create a new car */} 
       <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.InsertCarRecordsToServers} >
        
        <Text style={styles.TextStyle}> Insert Car Records to Server </Text>
 
      </TouchableOpacity>
       {/*Creates a button that loads the second page of the app, the list of all cars in the database*/}
      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.GoTo_Show_CarList_Activity_Function} >
 
        <Text style={styles.TextStyle}> Show all Car records</Text>
 
      </TouchableOpacity>
 
 
</View>
           
   );
 }
}   

//Starts the stack navigator upon app launch
export default carRegistration

