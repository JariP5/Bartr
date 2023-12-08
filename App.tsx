import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { UserProvider } from './src/Context/User';
import RenderContentBasedOnContext from './src/Screens/BasedOn/Context';


export default function App() {

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <UserProvider>
          <RenderContentBasedOnContext/>
        </UserProvider>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

