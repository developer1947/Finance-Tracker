import * as React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import Register from "../screens/Register";
import Login from "../screens/Login";
const Stack=createStackNavigator();
export default LoginStack=()=>{
  return (
    <Stack.Navigator initialRouteName="Register">
              <Stack.Screen options={{headerShown:false}} name="Register" component={Register}/>
        <Stack.Screen options={{headerShown:false}} name="Login" component={Login}/>
    </Stack.Navigator>  
  )
}