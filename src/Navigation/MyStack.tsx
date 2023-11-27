import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Influencer from '../Influencer';
import Login from '../Login';
import { StackParamList } from './Params';

const Stack = createNativeStackNavigator<StackParamList>();

function MyStack() {
  return(
    <Stack.Navigator 
      initialRouteName="Login" 
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen 
        name="Login" 
        component={Login}
      />
      <Stack.Screen 
        name="Influencer" 
        component={Influencer}
      />
    </Stack.Navigator>  
  );
}

export default MyStack;