import { Button, ButtonText, HStack, ScrollView, Text, VStack, View } from '@gluestack-ui/themed';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import Switch from '../../../Reused Components/Switch';
import useBusinessDeals from './useDeals';
  

function BusinessDeals() {
    const {
        shownDeals,
        options,
        toggleSwitch,
        acceptDeal,
        declineDeal,
        refreshing,
        onRefresh
    } = useBusinessDeals();

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
                    <HStack key={deal.id} mx={10} bgColor={'$warmGray300'} borderRadius={5} p={10} justifyContent='space-between' alignItems='center'>
                        <Text>{deal.data.title}</Text>
                        <VStack>
                            {deal.data.status === "requested" &&
                                <View>
                                    <Button
                                        bgColor={'$green500'} $active-bgColor={'$green700'}  onPress={() => acceptDeal(deal)}
                                    >
                                        <ButtonText>Accept</ButtonText>
                                    </Button>
                                    <Button
                                        bgColor={'$red500'} $active-bgColor={'$red700'} mt={2} onPress={() => declineDeal(deal)}
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
  
export default BusinessDeals;

