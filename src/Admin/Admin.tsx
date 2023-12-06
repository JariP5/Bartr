import { Button, ButtonText, Center, Text, View } from '@gluestack-ui/themed';
import React from "react";
import useAdmin from './useAdmin';


const Admin = () => {
    const {
        unverifiedInfluencers,
        verifyInfluencer
    } = useAdmin();

    return (
        <Center w={"100%"} mt={200}>
            <Text>Welcome</Text>
            {unverifiedInfluencers.map((influencer, index) => (
                <View key={index}>
                    <Text>{`${influencer.data.firstName} ${influencer.data.lastName}`}</Text>
                    <Button
                        mt={2} onPress={() => verifyInfluencer(influencer.id)}
                    > 
                        <ButtonText>Verify {influencer.data.firstName}</ButtonText>
                    </Button>
                </View>
            ))}
        </Center>
    );
};

export default Admin;