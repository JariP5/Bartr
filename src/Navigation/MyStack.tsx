import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Home from '../Screens/Home/Home';
import Login from '../Screens/Login/Login';
import SignUp from '../Screens/SignUp/Influencer/SignUp';
import { StackParamList } from './Params';

type Props = {
  initialRouteName: "Login" | "SignUpInfluencer" | "SignUpBusiness" | "Home"
}

const Stack = createNativeStackNavigator<StackParamList>();

function MyStack({ initialRouteName }: Props) {
  return(
    <Stack.Navigator 
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen 
        name="Login" 
        component={Login}
      />
      <Stack.Screen 
        name="SignUpInfluencer" 
        component={SignUp}
      />
      <Stack.Screen 
        name="SignUpBusiness" 
        component={SignUp}
      />
      <Stack.Screen 
        name="Home" 
        component={Home}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>  
  );
}

export default MyStack;