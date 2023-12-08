import { Box, HStack, Heading, View } from '@gluestack-ui/themed';
import React from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GoBack from '../../Reused Components/GoBack';

type Props = {
    role: string
}

const SignUpHeader = ({ role }: Props) => {
    const safeArea = useSafeAreaInsets();
    return(
        <View w={'100%'}>
            <HStack w={'100%'} alignItems={'center'} justifyContent={'space-between'} paddingTop={safeArea.top + 10} paddingBottom={10} px={10}>
                <GoBack/>
                <Heading>{role}</Heading>
                <View w={20} />
            </HStack>
            <Box h={2} bgColor={'$blue500'} w={'100%'}></Box>
        </View>
      );
};

export default SignUpHeader;