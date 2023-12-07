import { Box, HStack, Text, View } from '@gluestack-ui/themed';
import * as React from 'react';
import Logout from './Logout/Logout';
  
  
type Props = {
    role: string
    name: string
    userId: string
}

function Header({ role, name, userId }: Props) {
    return(
        <View>
            <View paddingTop={20}>
                <View h={20} alignItems={'center'} justifyContent={'center'}>
                <HStack mx={2} alignItems={'center'} space={'md'}>

                    <Text>{role}</Text>
                    <Text>{name}</Text>
                    <Logout userId={userId}/>
                    
                </HStack>
                </View>
            </View>
            <HStack alignItems={'center'}>
                <Box h={1} flex={1} bg={'$red500'}/>  
            </HStack>
        </View>
    );
}

export default Header;