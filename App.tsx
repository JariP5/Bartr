import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { UserContext, UserProvider } from './src/Context/User';
import RenderContentBasedOnContext from './src/Screens/BasedOn/Context';
import RenderBasedOnLoginStatus from './src/Screens/BasedOn/LoginStatus';


export default function App() {

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <UserProvider>
          <RenderContentBasedOnContext content={AppContent} contextComponent={UserContext}/>
        </UserProvider>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

function AppContent() {
  return (
    <RenderBasedOnLoginStatus />
  )
}

