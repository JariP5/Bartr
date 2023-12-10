import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Home from '../Screens/Home/Home';
import Login from '../Screens/Login/Login';
import SignUpBusiness from '../Screens/SignUp/Business/SignUp';
import SignUpInfluencer from '../Screens/SignUp/Influencer/SignUp';
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
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SignUpInfluencer" 
        component={SignUpInfluencer}
        options={{ headerShown: false }}
        // options={{ presentation: 'modal'}}
      />
      <Stack.Screen 
        name="SignUpBusiness" 
        component={SignUpBusiness}
        options={{ headerShown: false }}
        // options={{ presentation: 'modal'}}
      />
      <Stack.Screen 
        name="Home" 
        component={Home}
        options={{ gestureEnabled: false, headerShown: false }}
      />
    </Stack.Navigator>  
  );
}

export default MyStack;