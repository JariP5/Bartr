import { Button, ButtonText, HStack, ScrollView, Text, VStack, View } from '@gluestack-ui/themed';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import Switch from '../Switch';
import useAccepted from './useAccepted';
  
function Accepted() {
    const {
        acceptedInfluencers,
        acceptedBusinesses,
        toggleUser,
        activeValue,
        declineUser,
        waitUser,
        refreshing,
        onRefresh
    } = useAccepted();

    const acceptedUsers = activeValue === 0 ? acceptedInfluencers : acceptedBusinesses;

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

                {acceptedUsers.map((user, index) => (
                    <HStack key={index} mx={10} bgColor='$yellow100' p={10} justifyContent='space-between' alignItems='center'>
                        <Text>{user.data.displayName}</Text>
                        <VStack>
                            <Button
                                mt={2} onPress={() => waitUser(user)}
                            >
                                <ButtonText>Wait</ButtonText>
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
  
export default Accepted;

