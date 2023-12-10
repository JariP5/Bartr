import { Button, ButtonText, HStack, ScrollView, Text, VStack, View } from '@gluestack-ui/themed';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import Switch from '../../../Reused Components/Switch';
import useOffers from './useOffers';
  

function Offers() {
    const {
        shownOffers,
        options,
        toggleSwitch,
        pauseOffer,
        startOffer,
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
                
                <View px={10} >
                    <Switch toggleSwitch={toggleSwitch} options={options} />
                </View>

                {shownOffers.map((offer) => (
                    <HStack key={offer.id} mx={10} bgColor='$yellow100' p={10} justifyContent='space-between' alignItems='center'>
                        <Text>{offer.data.title}</Text>
                        <VStack>
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

