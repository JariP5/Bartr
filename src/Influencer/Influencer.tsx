import { Center, Text } from '@gluestack-ui/themed';
import React from "react";
import useInfluencer from './useInfluencer';


const Influencer = () => {
    const {
        user
    } = useInfluencer();
    return (
        <Center w={"100%"} mt={200}>
            <Text>Welcome {user}</Text>
        </Center>
      );
};

export default Influencer;