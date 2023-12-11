import { Button, ButtonText, HStack, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import useOffers from './useOffers';
  

function InfluencerOffers() {
    const {
        offers,
        requestDeal,
        refreshing,
        onRefresh
    } = useOffers();



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
                {offers.map((offer) => (
                    <HStack key={offer.id} mx={10} bgColor={'$warmGray300'} borderRadius={5} p={10} justifyContent='space-between' alignItems='center'>
                        <Text>{offer.data.title}</Text>
                        <VStack>
                            <Button
                                mt={2} onPress={() => requestDeal(offer)}
                            >
                                <ButtonText>Request Offer</ButtonText>
                            </Button>
                        </VStack>
                    </HStack>
                ))}

            </VStack>
        </ScrollView>
    );
}
  
export default InfluencerOffers;

