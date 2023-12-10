import { Button, ButtonText, HStack, ScrollView, Text, VStack, View } from '@gluestack-ui/themed';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import Switch from '../../../Reused Components/Switch';
import useOffers from './useDeals';
  

function Deals() {
    const {
        shownDeals,
        options,
        toggleSwitch,
        acceptDeal,
        declineDeal,
        refreshing,
        onRefresh
    } = useOffers();

    return(
        <ScrollView 
            flex={1}
            w={'100%'} 
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

                {shownDeals.map((deal, index) => (
                    <HStack key={index} mx={10} bgColor='$yellow100' p={10} justifyContent='space-between' alignItems='center'>
                        <Text>Deal Title</Text>
                        <VStack>
                            {deal.data.status === "requested" &&
                                <View>
                                    <Button
                                    mt={2} onPress={() => acceptDeal(deal)}
                                    >
                                        <ButtonText>Accept</ButtonText>
                                    </Button>
                                    <Button
                                        mt={2} onPress={() => declineDeal(deal)}
                                    >
                                        <ButtonText>Decline</ButtonText>
                                    </Button>
                                </View>
                            }
                        </VStack>
                    </HStack>
                ))}

            </VStack>
        </ScrollView>
    );
}
  
export default Deals;

