import { Box, HStack, Heading, View } from '@gluestack-ui/themed';
import * as React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserContext } from '../../Context/User';
import Logout from './Logout/Logout';

function Header() {
    const { user } = useUserContext();
    const safeArea = useSafeAreaInsets();

    return(
        <View w={'100%'}>
            <HStack w={'100%'} alignItems={'center'} justifyContent={'space-between'} paddingTop={safeArea.top} paddingBottom={10} px={20}>
                <View w={20} />
                <Heading>{user?.data.role}</Heading>
                <Logout />
            </HStack>
            <Box h={2} bgColor={'$blue500'} w={'100%'}></Box>
        </View>
    );
}

export default Header;