import { Text } from '@gluestack-ui/themed';
import React from "react";
import useBusiness from './useBusiness';


const Business = () => {
    const {
        user
    } = useBusiness();
    return (
        <Text>{user?.data.email}</Text>
    );
};

export default Business;