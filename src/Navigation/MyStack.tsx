import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Admin from '../Admin/Admin';
import Influencer from '../Influencer/Influencer';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import SignUpSuccess from '../SignUp/Success';
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
        name="SignUpSuccess" 
        component={SignUpSuccess}
      />
      <Stack.Screen 
        name="Admin" 
        component={Admin}
      />
      <Stack.Screen 
        name="Influencer" 
        component={Influencer}
      />
    </Stack.Navigator>  
  );
}

export default MyStack;