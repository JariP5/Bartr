import { Center, Text } from '@gluestack-ui/themed';
import React from "react";
import useBusiness from './useBusiness';


const Business = () => {
    const {
        userData
    } = useBusiness();
    return (
        <Center w={"100%"} mt={200}>
            <Text>Welcome Business {userData?.name}</Text>
            <Text>Verified: {userData?.verified ? "True" : "False"}</Text>
        </Center>
      );
};

export default Business;