import { Button, ButtonText, Input, InputField, Text, VStack, View } from '@gluestack-ui/themed';
import React from "react";
import SignUpHeader from '../Header';
import SignUpModal from '../Modal';
import useSignUpBusiness from './useSignUp';

const SignUpBusiness = () => {
    const {
        setCompanyName, 
        setLocation,
        setEmail, 
        setPassword,
        setConfirmedPassword, 
        validCredentials,
        handleSignUp,
        showModal
    } = useSignUpBusiness();


    return (
        <View flex={1}>
        
            <SignUpHeader role={"Business"} />
    
            <VStack mt={100} space={'md'} px={50}>
                <Input >
                    <InputField placeholder={"Company Name"} onChangeText={value => setCompanyName(value)}/>
                </Input>

                <Input>
                    <InputField placeholder={"Location"} onChangeText={value => setLocation(value)}/>
                </Input>

                <Input>
                    <InputField placeholder={"Email"} onChangeText={value => setEmail(value)}/>
                </Input>

                <Input>
                    <InputField placeholder={"Password"} type="password" onChangeText={value => setPassword(value)}/>
                </Input>
                <Input>
                    <InputField placeholder={"Confirm Password"} type="password" onChangeText={value => setConfirmedPassword(value)}/>
                </Input>


                {!validCredentials && <Text color='red'>Passwords do not match</Text>}

                <Button 
                    mt={2} onPress={() => handleSignUp()}
                > 
                    <ButtonText>SignUp</ButtonText>
                </Button>

                <SignUpModal showModal={showModal}/>

            </VStack>
        </View>
      );
};

export default SignUpBusiness;