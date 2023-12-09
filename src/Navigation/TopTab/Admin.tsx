import { Text } from '@gluestack-ui/themed';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import Status from '../../Screens/Admin/Status/Status';
import { AdminTopTabParamList } from '../Params';
import topTabNavigatorOptions from './styleOptions';

const TopTab = createMaterialTopTabNavigator<AdminTopTabParamList>();

function AdminTopTab() {

  return(
    <TopTab.Navigator screenOptions={topTabNavigatorOptions()}>
      <TopTab.Screen 
        name="Waiting"
        component={Status}

      />
      <TopTab.Screen 
        name="Accepted" 
        component={Status} 
      />
       <TopTab.Screen 
        name="Declined" 
        component={Status} 
      />
    </TopTab.Navigator>
  );
}

function Empty() {
  return (
    <Text> EMpty View</Text>
  )
}

export default AdminTopTab;