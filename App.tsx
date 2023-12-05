import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MyStack from './src/Navigation/MyStack';


export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <MyStack/>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

