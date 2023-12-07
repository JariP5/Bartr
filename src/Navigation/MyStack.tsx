import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Admin from '../Screens/Admin/Admin';
import Business from '../Screens/Business/Business';
import Influencer from '../Screens/Influencer/Influencer';
import Login from '../Screens/Login/Login';
import SignUp from '../Screens/SignUp/SignUp';
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
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen 
        name="Business" 
        component={Business}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen 
        name="Influencer" 
        component={Influencer}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>  
  );
}

export default MyStack;