import { ExternalLinkIcon, Pressable, View } from '@gluestack-ui/themed';
import * as React from 'react';
import useLogout from './useLogout';

function Logout() {
    const {
        handleLogout
    } = useLogout();

    return(
        <View w={20}>
            <Pressable
                $pressed={{opacity: 0.5}}
                onPress={() => handleLogout()}
            > 
                <ExternalLinkIcon size={'xl'} />
            </Pressable>
        </View>
    );
}

export default Logout;