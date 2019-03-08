import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import carList from './src/carList';
import carRegistration from './src/carRegistration';
import editCars from './src/editCars'



//Creates stack navigator in a const. Assigns the different screens a name stored by their component
const carRegistrationProject = createStackNavigator(
  {
  First: { screen: carRegistration },
  Second: { screen: carList},
  Third: {screen: editCars}
  });

  //Starts the stack navigator upon app launch
export default createAppContainer(carRegistrationProject)

