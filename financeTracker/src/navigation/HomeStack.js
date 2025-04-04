import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Home from "../screens/Home";


const Stack = createStackNavigator();
export default HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
    </Stack.Navigator>
  )
}