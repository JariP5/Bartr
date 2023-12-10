import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import BusinessDeals from '../../Screens/Business/Deals/Deals';
import BusinessOffers from '../../Screens/Business/Offers/Offers';
import { BusinessTopTabParamList } from '../Params';
import topTabNavigatorOptions from './styleOptions';

const TopTab = createMaterialTopTabNavigator<BusinessTopTabParamList>();

function BusinessTopTab() {

  return(
    <TopTab.Navigator screenOptions={topTabNavigatorOptions()}>
      <TopTab.Screen 
        name="Offers"
        component={BusinessOffers}

      />
      <TopTab.Screen 
        name="Deals" 
        component={BusinessDeals} 
      />
    </TopTab.Navigator>
  );
}


export default BusinessTopTab;