import { Button, ButtonText } from '@gluestack-ui/themed';
import * as React from 'react';
import useLogout from './useLogout';

function Logout() {
    const {
        handleLogout
    } = useLogout();

    return(
        <Button 
            mt={5} onPress={() => handleLogout()}
        > 
            <ButtonText>Logout</ButtonText>
        </Button>
    );
}

export default Logout;