import { Box, Divider, HStack, Text, View } from '@gluestack-ui/themed';
import * as React from 'react';
import { useUserContext } from '../../Context/User';
import Logout from './Logout/Logout';

function Header() {
    const { user } = useUserContext();
    return(
        <View>
            <View paddingTop={40}>
                <HStack mx={2} alignItems={'center'} space={'md'}>

                    <Text>Empty</Text>
                    <Divider orientation="vertical"/>
                    <Text>{user?.data.displayName}</Text>
                    <Divider orientation="vertical"/>
                    <Logout/>
                    
                </HStack>
            </View>
            <HStack alignItems={'center'} mt={2}>
                <Box h={1} flex={1} bg={'$red400'}/>  
            </HStack>
        </View>
    );
}

export default Header;