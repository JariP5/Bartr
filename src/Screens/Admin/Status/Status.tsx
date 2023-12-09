import { Button, ButtonText, HStack, ScrollView, Text, VStack, View } from '@gluestack-ui/themed';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import Switch from '../Switch';
import useStatus from './useStatus';
  

function Status() {
    const {
        influencers,
        businesses,
        toggleUser,
        activeValue,
        acceptUser,
        declineUser,
        waitUser,
        refreshing,
        onRefresh,
        status
    } = useStatus();

    const Users = activeValue === 0 ? influencers : businesses;

    return(
        <ScrollView 
            flex={1} 
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
                    <Switch toggleUser={toggleUser} />
                </View>

                {Users.map((user, index) => (
                    <HStack key={index} mx={10} bgColor='$yellow100' p={10} justifyContent='space-between' alignItems='center'>
                        <Text>{user.data.displayName}</Text>
                        <VStack>
                            {status !== "accepted" &&
                                <Button
                                    bgColor={'$green500'} mt={2} onPress={() => acceptUser(user)}
                                >
                                    <ButtonText>Accept</ButtonText>
                                </Button>
                            }

                            {status !== "waiting" &&
                                <Button
                                    mt={2} onPress={() => waitUser(user)}
                                >
                                    <ButtonText>Wait</ButtonText>
                                </Button>
                            }

                            {status !== "declined" &&
                                <Button
                                    bgColor={'$red500'} mt={2} onPress={() => declineUser(user)}
                                >
                                    <ButtonText>Decline</ButtonText>
                                </Button>
                            }
                        </VStack>
                    </HStack>
                ))}


            </VStack>
        </ScrollView>
    );
}
  
export default Status;

