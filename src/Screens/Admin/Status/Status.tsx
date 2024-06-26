import { Button, ButtonText, HStack, ScrollView, Text, VStack, View } from '@gluestack-ui/themed';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import Switch from '../../../Reused Components/Switch';
import useStatus from './useStatus';
  

function Status() {
    const {
        shownUsers,
        options,
        toggleSwitch,
        acceptUser,
        declineUser,
        waitUser,
        refreshing,
        onRefresh,
        status
    } = useStatus();    

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

                {shownUsers.map((user) => (
                    <HStack key={user.id} mx={10} bgColor={'$warmGray300'} borderRadius={5} p={10} justifyContent={'space-between'} alignItems={'center'}>
                        <Text>{user.data.displayName}</Text>
                        <VStack>
                            {status !== "accepted" &&
                                <Button
                                    bgColor={'$green500'} $active-bgColor={'$green700'}  mt={2} onPress={() => acceptUser(user)}
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
                                    bgColor={'$red500'} $active-bgColor={'$red700'} mt={2} onPress={() => declineUser(user)}
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

