import { Center, Text } from '@gluestack-ui/themed';
import React from "react";
import useInfluencer from './useInfluencer';


const Influencer = () => {
    const {
        userData
    } = useInfluencer();
    return (
        <Center w={"100%"} mt={200}>
            <Text>Welcome {userData?.firstName}</Text>
            <Text>Verified: {userData?.verified ? "True" : "False"}</Text>
        </Center>
      );
};

export default Influencer;