import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, ActivityIndicator } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import {firstBy} from 'thenby';
import styles from './styles';
const localhost = 'http://192.168.137.136:8081/'

class carList extends Component {

  //Sets title at top of page to Car List
  static navigationOptions =
  {
    title: 'Car List',
  };

    //Creating Boolean State for Activity Indicator store car data from server in  
    constructor(props) {
      super(props);

      this.state ={
        
        isLoading: true
      }
    }

    //Function for navigating to the third page. It Sets the values to be carried to thge thiird page.
    GetCarIDFunction=(car_id,car_make, car_model, car_year, car_kilometers, car_vin)=>{
      //navigates to the third page
      this.props.navigation.navigate('Third', { 

        ID :  car_id,
        MAKE : car_make,
        MODEL : car_model,
        YEAR : car_year,
        KILOMETERS: car_kilometers,
        VIN : car_vin

      });

 }

     //Function to be run through the FlatList's ItemSeperatorComponent. It Styles the space between items in the list
    FlatListItemSeparator = () => {
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

  //Fetch's Data from the server after component loads    
  componentDidMount() {

    //Fetch Statement to retrieve all cars in database
   return fetch(localhost + 'read/')
   //Turning the response into JSON
     .then((response) => response.json())
     //Putting the response in a variable called responseJSON
     .then((responseJson) => {
        
      // Sorting JSON into alphatical order by make then model
       responseJson.sort(
         firstBy("car_make", {ignoreCase:true})
         .thenBy("car_model")
      ); 
      
  this.setState({
         //sets the state of dataSource to the response from the server
         dataSource: responseJson,
         isLoading: false,
       },
       );
     })
     
     .catch((error) => {
       console.error(error);
     });
 
    }

 //Displays the activity indicator while waiting for Data from Server   
 render() {
  if (this.state.isLoading) {
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ActivityIndicator />
      </View>
    );
  }

  //Displays Car list after data fetched from server
   return (
     <View style={styles.MainContainer_For_carList}>
    <FlatList
      ItemSeparatorComponent = {this.FlatListItemSeparator}
      data={this.state.dataSource}
      renderItem={({item}) => 
        <Text style={styles.rowViewContainer}  
            //When any of the rows in the list are pressed on, the values below are sent to the GetCarIDFunction as paramaters  
            onPress={this.GetCarIDFunction.bind(
              this, item.car_id,
              item.car_make, 
              item.car_model, 
              item.car_year, 
              item.car_kilometers,
              item.car_vin)}>

           {/* Information being displayed in each row of the list */}   
          {item.car_year} - {item.car_make} {item.car_model}
          </Text>}
          //keyExtractor is used as the key to track item re-ordering, while optional it helps with performance 
      keyExtractor={item  => item.car_id.toString()}

    />
    
    </View>
   )
 }


}


//exports component to App
export default carList

