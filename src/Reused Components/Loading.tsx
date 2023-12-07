import { Center, LoaderIcon } from '@gluestack-ui/themed';
import * as React from 'react';

function Loading() {
    return(
        <Center flex={1}>
            <LoaderIcon size='lg'/>
        </Center>
    );
}

export default Loading;