import { Button, ButtonText } from '@gluestack-ui/themed';
import * as React from 'react';
import useLogout from './useLogout';

type Props = {
    userId: string
}
function Logout({ userId }: Props) {
    const {
        handleLogout
    } = useLogout();

    return(
        <Button 
            mt={5} onPress={() => handleLogout(userId)}
        > 
            <ButtonText>Logout</ButtonText>
        </Button>
    );
}

export default Logout;