import { Button, ButtonText, Center, Input, InputField, Text, VStack } from '@gluestack-ui/themed';
import React from "react";
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
        <Center w={"100%"}>
    
            <VStack mt={200} space={'xs'}>

                <Input w={200}>
                    <InputField placeholder={"Company Name"} onChangeText={value => setCompanyName(value)}/>
                </Input>

                <Input w={200}>
                    <InputField placeholder={"Location"} onChangeText={value => setLocation(value)}/>
                </Input>

                <Input w={200}>
                    <InputField placeholder={"Email"} onChangeText={value => setEmail(value)}/>
                </Input>

                <Input w={200}>
                    <InputField placeholder={"Password"} type="password" onChangeText={value => setPassword(value)}/>
                </Input>
                <Input w={200}>
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
        </Center>
      );
};

export default SignUpBusiness;