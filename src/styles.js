import { StyleSheet, Platform } from 'react-native';


//Creates a Style sheet
const styles = StyleSheet.create({
 
  MainContainer :{
 
    alignItems: 'center',
    flex:1,
    paddingTop: 30,
    backgroundColor: '#fff'
 
  },
 
  MainContainer_For_carList :{
    
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

export default styles