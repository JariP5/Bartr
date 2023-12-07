import { Text } from '@gluestack-ui/themed';
import React from "react";
import useInfluencer from './useInfluencer';


const Influencer = () => {
    const {
        
    } = useInfluencer();
    return (
        <Text>Welcome Influencer</Text>
      );
};

export default Influencer;