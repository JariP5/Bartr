import { Button, ButtonText, HStack, ScrollView, Text, VStack, View } from '@gluestack-ui/themed';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import Switch from '../../../Reused Components/Switch';
import useOffers from './useOffers';
  

function Offers() {
    const {
        liveOffers,
        pausedOffers,
        toggleSwitch,
        activeValue,
        pauseOffer,
        startOffer,
        refreshing,
        onRefresh
    } = useOffers();

    const offers = activeValue === 0 ? liveOffers : pausedOffers;

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
                    <Switch toggleSwitch={toggleSwitch} labels={["Live", "Paused"]} />
                </View>

                {offers.map((offer) => (
                    <HStack key={offer.data.modified} mx={10} bgColor='$yellow100' p={10} justifyContent='space-between' alignItems='center'>
                        <Text>{offer.data.title}</Text>
                        <VStack key={offer.data.modified}>
                            {offer.data.status === "paused" &&
                                <Button
                                   mt={2} onPress={() => startOffer(offer)}
                                >
                                    <ButtonText>Resume Offer</ButtonText>
                                </Button>
                            }

                            {offer.data.status === "live" &&
                                <Button
                                    mt={2} onPress={() => pauseOffer(offer)}
                                >
                                    <ButtonText>Pause Offer</ButtonText>
                                </Button>
                            }
                        </VStack>
                    </HStack>
                ))}

            </VStack>
        </ScrollView>
    );
}
  
export default Offers;

