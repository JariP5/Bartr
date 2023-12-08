import { Text } from '@gluestack-ui/themed';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import Accepted from '../../Screens/Admin/Accepted/Accepted';
import Declined from '../../Screens/Admin/Declined/Declined';
import Waiting from '../../Screens/Admin/Waiting/Waiting';
import { AdminTopTabParamList } from '../Params';
import topTabNavigatorOptions from './styleOptions';

const TopTab = createMaterialTopTabNavigator<AdminTopTabParamList>();

function AdminTopTab() {

  return(
    <TopTab.Navigator screenOptions={topTabNavigatorOptions()}>
      <TopTab.Screen 
        name="Waiting"
        component={Waiting}
      />
      <TopTab.Screen 
        name="Accepted" 
        component={Accepted} 
      />
       <TopTab.Screen 
        name="Declined" 
        component={Declined} 
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