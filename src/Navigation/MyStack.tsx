import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Admin from '../Admin/Admin';
import Business from '../Business/Business';
import Influencer from '../Influencer/Influencer';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
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
        name="SignUp" 
        component={SignUp}
      />
      <Stack.Screen 
        name="Admin" 
        component={Admin}
      />
      <Stack.Screen 
        name="Business" 
        component={Business}
      />
      <Stack.Screen 
        name="Influencer" 
        component={Influencer}
      />
    </Stack.Navigator>  
  );
}

export default MyStack;