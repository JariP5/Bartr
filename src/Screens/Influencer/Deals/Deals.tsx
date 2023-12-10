import { HStack, ScrollView, Text, VStack, View } from '@gluestack-ui/themed';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import Switch from '../../../Reused Components/Switch';
import useInfluencerDeals from './useDeals';
  

function InfluencerDeals() {
    const {
        shownDeals,
        options,
        toggleSwitch,
        refreshing,
        onRefresh
    } = useInfluencerDeals();

    return(
        <ScrollView 
            bg={'white'} 
            showsVerticalScrollIndicator={false} 
            pt={10} 
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
            }>
            <VStack space={'md'}>
                
                <View px={10} >
                    <Switch toggleSwitch={toggleSwitch} options={options} />
                </View>

                {shownDeals.map((deal) => (
                    <HStack key={deal.id} mx={10} bgColor='$yellow100' p={10} justifyContent='space-between' alignItems='center'>
                        <Text>{deal.data.title}</Text>
                    </HStack>
                ))}

            </VStack>
        </ScrollView>
    );
}
  
export default InfluencerDeals;

