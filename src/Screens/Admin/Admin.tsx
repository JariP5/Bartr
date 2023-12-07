import { Button, ButtonText, Center, Text, View } from '@gluestack-ui/themed';
import React from "react";
import useAdmin from './useAdmin';


const Admin = () => {
    const {
        unverifiedInfluencers,
        unverifiedBusinesses, 
        verifyUser
    } = useAdmin();

    return (
        <Center w={"100%"}>

            <Text mt={100}>Unverified Influencers</Text>
            {unverifiedInfluencers.map((influencer, index) => (
                <View key={index}>
                    <Text>{`${influencer.data.influencer!.firstName} ${influencer.data.influencer!.lastName}`}</Text>
                    <Button
                        mt={2} onPress={() => verifyUser(influencer.id)}
                    > 
                        <ButtonText>Verify {influencer.data.influencer!.firstName}</ButtonText>
                    </Button>
                </View>
            ))}

            <Text mt={100}>Unverified Business</Text>
            {unverifiedBusinesses.map((business, index) => (
                <View key={index}>
                    <Text>{`${business.data.business!.companyName}`}</Text>
                    <Button
                        mt={2} onPress={() => verifyUser(business.id)}
                    > 
                        <ButtonText>Verify {business.data.business!.companyName}</ButtonText>
                    </Button>
                </View>
            ))}

        </Center>
    );
};

export default Admin;