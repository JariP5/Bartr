import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import Deals from '../../Screens/Business/Deals/Deals';
import Offers from '../../Screens/Business/Offers/Offers';
import { BusinessTopTabParamList } from '../Params';
import topTabNavigatorOptions from './styleOptions';

const TopTab = createMaterialTopTabNavigator<BusinessTopTabParamList>();

function BusinessTopTab() {

  return(
    <TopTab.Navigator screenOptions={topTabNavigatorOptions()}>
      <TopTab.Screen 
        name="Offers"
        component={Offers}

      />
      <TopTab.Screen 
        name="Deals" 
        component={Deals} 
      />
    </TopTab.Navigator>
  );
}


export default BusinessTopTab;