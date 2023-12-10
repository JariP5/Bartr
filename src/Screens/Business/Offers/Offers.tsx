import { AddIcon, Button, ButtonText, Fab, FabIcon, FabLabel, HStack, ScrollView, Text, VStack, View } from '@gluestack-ui/themed';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import Switch from '../../../Reused Components/Switch';
import useOffers from './useOffers';
  

function BusinessOffers() {
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
        <View flex={1} bgColor='yellow'>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                pt={10} 
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                }>
                <VStack space={'md'} >
                    
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
            <Fab
                size="md"
                placement="bottom right"
                isHovered={false}
                isDisabled={false}
                isPressed={false}
            >
                <FabIcon as={AddIcon} mr="$1" />
                <FabLabel>New Offer</FabLabel>
            </Fab>
    </View>
    );
}
  
export default BusinessOffers;

