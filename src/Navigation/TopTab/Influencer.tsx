import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import InfluencerDeals from '../../Screens/Influencer/Deals/Deals';
import InfluencerOffers from '../../Screens/Influencer/Offers/Offers';
import { InfluencerTopTabParamList } from '../Params';
import topTabNavigatorOptions from './styleOptions';

const TopTab = createMaterialTopTabNavigator<InfluencerTopTabParamList>();

function InfluencerTopTab() {

  return(
    <TopTab.Navigator screenOptions={topTabNavigatorOptions()}>
      <TopTab.Screen 
        name="Offers"
        component={InfluencerOffers}

      />
      <TopTab.Screen 
        name="Deals" 
        component={InfluencerDeals} 
      />
    </TopTab.Navigator>
  );
}


export default InfluencerTopTab;