import { Button, ButtonText, Center, Text, View } from '@gluestack-ui/themed';
import React from "react";
import Header from '../../Reused Components/Header/Header';
import useAdmin from './useAdmin';


const Admin = () => {
    const {
        unverifiedInfluencers,
        verifyInfluencer,
        unverifiedBusinesses, 
        verifyBusiness
    } = useAdmin();

    return (
        <Center w={"100%"}>
            <Header role={'Admin'} name={'Admin'} userId={"admin"}/>

            <Text>Unverified Influencers</Text>
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

            <Text mt={50}>Unverified Business</Text>
            {unverifiedBusinesses.map((business, index) => (
                <View key={index}>
                    <Text>{`${business.data.name}`}</Text>
                    <Button
                        mt={2} onPress={() => verifyBusiness(business.id)}
                    > 
                        <ButtonText>Verify {business.data.name}</ButtonText>
                    </Button>
                </View>
            ))}

        </Center>
    );
};

export default Admin;