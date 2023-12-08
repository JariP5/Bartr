import { Button, ButtonText, Center, Input, InputField, Text, VStack } from '@gluestack-ui/themed';
import React from "react";
import SignUpHeader from '../Header';
import SignUpModal from '../Modal';
import useSignUpInfluencer from './useSignUp';

const SignUpInfluencer = () => {
    const {
        setFirstName, 
        setLastName,
        setBirthday,
        setInstagram,
        setEmail, 
        setPassword,
        setConfirmedPassword, 
        validCredentials,
        handleSignUp,
        showModal
    } = useSignUpInfluencer();

    return (
        <Center w={"100%"}>

            <SignUpHeader role={"Influencer"} />
    
            <VStack w={'100%'} mt={100} space={'md'} px={50}>

                <Input>
                    <InputField placeholder={"First Name"} onChangeText={value => setFirstName(value)}/>
                </Input>

                <Input>
                    <InputField placeholder={"Last Name"} onChangeText={value => setLastName(value)}/>
                </Input>

                <Input>
                    <InputField placeholder={"Instagram"} onChangeText={value => setInstagram(value)}/>
                </Input>

                <Input>
                    <InputField placeholder={"Birthday"} onChangeText={value => setBirthday(value)}/>
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
        </Center>
      );
};

export default SignUpInfluencer;