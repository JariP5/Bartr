import { Button, ButtonText, HStack, ScrollView, Text, VStack, View } from '@gluestack-ui/themed';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import Switch from '../Switch';
import useWaiting from './useWaiting';
  
function Waiting() {
    const {
        waitingInfluencers,
        waitingBusinesses,
        toggleUser,
        activeValue,
        acceptUser,
        declineUser,
        refreshing,
        onRefresh
    } = useWaiting();

    const waitingUsers = activeValue === 0 ? waitingInfluencers : waitingBusinesses;

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

                {waitingUsers.map((user, index) => (
                    <HStack key={index} mx={10} bgColor='$yellow100' p={10} justifyContent='space-between' alignItems='center'>
                        <Text>{user.data.displayName}</Text>
                        <VStack>
                            <Button
                                bgColor={'$green500'} mt={2} onPress={() => acceptUser(user)}
                            >
                                <ButtonText>Accept</ButtonText>
                            </Button>
                            <Button
                                bgColor={'$red500'} mt={2} onPress={() => declineUser(user)}
                            >
                                <ButtonText>Decline</ButtonText>
                            </Button>
                        </VStack>
                    </HStack>
                ))}


            </VStack>
        </ScrollView>
    );
}
  
export default Waiting;

