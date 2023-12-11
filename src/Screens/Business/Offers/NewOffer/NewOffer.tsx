import { Button, ButtonText, Input, InputField, VStack, View } from '@gluestack-ui/themed';
import React from "react";
import SignUpHeader from '../../../SignUp/Header';
import useNewOffer from './useNewOffer';

const NewOffer = () => {
    const {
        setTitle, 
        setTask, 
        setReward,
        handlePost
    } = useNewOffer();


    return (
        <View flex={1} >
        
            <SignUpHeader role={"New Offer"} />
    
            <VStack mt={100} space={'md'} px={50}>
                <Input >
                    <InputField placeholder={"Title"} onChangeText={value => setTitle(value)}/>
                </Input>

                <Input>
                    <InputField placeholder={"Task"} onChangeText={value => setTask(value)}/>
                </Input>

                <Input>
                    <InputField placeholder={"Reward"} onChangeText={value => setReward(value)}/>
                </Input>

                <Button 
                    mt={2} onPress={() => handlePost()}
                > 
                    <ButtonText>Post Offer</ButtonText>
                </Button>


            </VStack>
        </View>
      );
};

export default NewOffer;