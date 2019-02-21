import React, { Component } from 'react'; 
import { StyleSheet, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native'; 
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {firstBy} from 'thenby';

 
class MainActivity extends Component {
 
  static navigationOptions =
  {
     title: 'Register Your Car!!!!',
  };
 
constructor(props) {
 
   super(props)
 
   this.state = {
 
     TextInput_Car_Make: '',
     TextInput_Car_Model: '',
     TextInput_Car_Year: '',
     TextInput_Car_Kilometers: '',
     TextInput_Car_Vin: '',
 
   }
 
 }
 
 InsertCarRecordsToServers = () =>{
 
      fetch('http:/192.168.137.136:8081/', {
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
 
 GoTo_Show_CarList_Activity_Function = () =>
  {
    this.props.navigation.navigate('Second');
    
  }
 
 render() {
   return (
 
<View style={styles.MainContainer}>
 
 
       <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Car Registration Form </Text>
 
       <TextInput
         
         placeholder="Enter Car Make (e.g. Honda)"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_Car_Make : TextInputValue }) }
 
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
 
      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.InsertCarRecordsToServers} >
 
        <Text style={styles.TextStyle}> Insert Car Records to Server </Text>
 
      </TouchableOpacity>
 
      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.GoTo_Show_CarList_Activity_Function} >
 
        <Text style={styles.TextStyle}> Show all Car records</Text>
 
      </TouchableOpacity>
 
 
</View>
           
   );
 }
}
 
class ShowCarListActivity extends Component {
 
  constructor(props) { 
 
    super(props);
 
    this.state = {
 
      isLoading: true
 
    }
  }
 
  static navigationOptions =
  {
     title: 'Car List',
  };
 //Fetch Student record from database
  componentDidMount() {
    
       return fetch('http:/192.168.137.136:8081/read')
         .then((response) => response.json())
         .then((responseJson) => {
            // Sorting JSON into alphatical order by make then model

           responseJson.sort(
             firstBy("car_make", {ignoreCase:true})
             .thenBy("car_model")
             
          ); 
          
          //Running Server response through above function
         
           let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
           this.setState({
             isLoading: false,
             dataSource: ds.cloneWithRows(responseJson),
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }
    
     GetCarIDFunction=(car_id,car_make, car_model, car_year, car_kilometers, car_vin)=>{
 
          this.props.navigation.navigate('Third', { 
 
            ID :  car_id,
            MAKE : car_make,
            MODEL : car_model,
            YEAR : car_year,
            KILOMETERS: car_kilometers,
            VIN : car_vin
 
          });
 
     }
 
     ListViewItemSeparator = () => {
       return (
         <View
           style={{
             height: .5,
             width: "100%",
             backgroundColor: "#000",
           }}
         />
       );
     }
 
     render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
   
      return (
   
        <View style={styles.MainContainer_For_Show_CarList_Activity}>
   
          <ListView
   
            dataSource={this.state.dataSource}
   
            renderSeparator= {this.ListViewItemSeparator}
   
            renderRow={ (rowData) => <Text style={styles.rowViewContainer} 
 
                      onPress={this.GetCarIDFunction.bind(
                        this, rowData.car_id,
                         rowData.car_make, 
                         rowData.car_model, 
                         rowData.car_year, 
                         rowData.car_kilometers,
                         rowData.car_vin
                         )} > 
 
                      {rowData.car_year} {rowData.car_make} {rowData.car_model} 
                      
                      </Text> }
   
          />
   
        </View>
      );
    }
 
}
 
class EditCarRecordActivity extends Component {
  
  constructor(props) {
    
       super(props)
    
       this.state = {
    
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
      
            fetch('http:/192.168.137.136:8081/edit', {
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
        
          fetch('http:/192.168.137.136:8081/delete', {
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
 
const MyNewProject = createStackNavigator(
 
  {
 
    First: { screen: MainActivity }, 
    Second: { screen: ShowCarListActivity }, 
    Third: { screen: EditCarRecordActivity }
 
  });


export default createAppContainer(MyNewProject);
 
const styles = StyleSheet.create({
 
  MainContainer :{
 
    alignItems: 'center',
    flex:1,
    paddingTop: 30,
    backgroundColor: '#fff'
 
  },
 
  MainContainer_For_Show_Car_Activity :{
    
    flex:1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    marginLeft: 5,
    marginRight: 5
    
    },
 
  TextInputStyleClass: {
 
  textAlign: 'center',
  width: '90%',
  marginBottom: 7,
  height: 40,
  borderWidth: 1,
  borderColor: '#FF5722',
  borderRadius: 5 ,
 
  },
 
  TouchableOpacityStyle: {
 
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '90%',
    backgroundColor: '#00BCD4'
 
  },
 
  TextStyle:{
    color:'#fff',
    textAlign:'center',
  },
 
  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }
 
});