import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View, Platform, ActivityIndicator, Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import {firstBy} from 'thenby';
import styles from './styles';
const localhost = 'http://192.168.137.136:8081/'

class editCars extends Component {
  
  constructor(props) {
    
       super(props)
    
       this.state = {
          //Creates States for the text entered in the text boxs.
         TextInput_Car_Id: '',
         TextInput_Car_Make: '',
         TextInput_Car_Model: '',
         TextInput_Car_Year: '',
         TextInput_Car_Kilometers:'',
         TextInput_Car_Vin: '',
    
       }
    
     }
 
     componentDidMount(){
 
      // Received Car Details Sent From Previous Activity and Set Into State.
      this.setState({ 
        TextInput_Car_Id : this.props.navigation.state.params.ID,
        TextInput_Car_Make: this.props.navigation.state.params.MAKE,
        TextInput_Car_Model: this.props.navigation.state.params.MODEL,
        TextInput_Car_Year: this.props.navigation.state.params.YEAR,
        TextInput_Car_Kilometers: this.props.navigation.state.params.KILOMETERS,
        TextInput_Car_Vin: this.props.navigation.state.params.VIN,
      })
 
     }
  
    static navigationOptions =
    {
       title: 'Edit Car Records',
    };
 
    UpdateCarRecord = () =>{
      
            fetch(localhost + 'edit', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',

            },
            body: JSON.stringify({
      
              car_id : this.state.TextInput_Car_Id, 
              car_make : this.state.TextInput_Car_Make,      
              car_model : this.state.TextInput_Car_Model,      
              car_year : this.state.TextInput_Car_Year,              
              car_kilometers: this.state.TextInput_Car_Kilometers,
              car_vin: this.state.TextInput_Car_Vin
      
            })
      
            }).then((response) => response.json())
                .then((responseJson) => {
      
                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);
      
                }).catch((error) => {
                  console.error(error);
                });

                this.props.navigation.navigate('Second');
      
      }
 
 
    DeleteCarRecord = () =>{
        
          fetch(localhost + 'delete', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
        
            car_id : this.state.TextInput_Car_Id
        
          })
        
          }).then((response) => response.json())
          .then((responseJson) => {
        
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
        
          }).catch((error) => {
             console.error(error);
          });
 
          this.props.navigation.navigate('First');
 
      }
 
    render() {
 
      return (
   
   <View style={styles.MainContainer}>
   
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Edit Car Record Form </Text>
    
          <TextInput
            
            placeholder="Enter the Car's Make Here (e.g. Toyota)"
            
            value={this.state.TextInput_Car_Make}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Car_Make : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TextInput
            
            placeholder="Enter the Car's Model Here (e.g. Camry)"
 
            value={this.state.TextInput_Car_Model}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Car_Model : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TextInput
            
            placeholder="Enter the Car's Year Here (e.g. 1999)"
 
            value={this.state.TextInput_Car_Year}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Car_Year : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />

          <TextInput
            
            placeholder="Enter the Car's Kilometers Here (e.g. 123642)"
 
            value={this.state.TextInput_Car_Kilometers}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Car_Kilometers : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />  
   
          <TextInput
   
            placeholder="Enter the Car's VIN Here (e.g 231239dkj124j)"
 
            value={this.state.TextInput_Car_Vin}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Car_Vin : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateCarRecord} >
   
            <Text style={styles.TextStyle}> Update Car Records</Text>
   
         </TouchableOpacity>
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeleteCarRecord} >
   
            <Text style={styles.TextStyle}> Delete Car </Text>
   
         </TouchableOpacity>
    
   
   </View>
              
      );
    }
 
}
export default editCars