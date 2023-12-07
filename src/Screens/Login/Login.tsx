import { Button, ButtonText, Center, Input, InputField, Text, VStack } from '@gluestack-ui/themed';
import React from "react";
import useLogin from './useLogin';


const Login = () => {
    const {
        setEmail, 
        setPassword,
        handleLogin, 
        validCredentials,
        navigation
    } = useLogin();

    return (
        <Center w={"100%"}>
    
            <VStack mt={200} space={'xs'}>

                <Input w={200}>
                    <InputField placeholder={"Email"} onChangeText={value => setEmail(value)}/>
                </Input>

                <Input w={200}>
                    <InputField placeholder={"Password"} type="password" onChangeText={value => setPassword(value)}/>
                </Input>

                {!validCredentials && <Text color='red'>Invalid Credentials</Text>}

                <Button 
                    mt={2} onPress={() => handleLogin()}
                > 
                    <ButtonText>Login</ButtonText>
                </Button>

                <Button 
                    mt={5} onPress={() => navigation.push('SignUpInfluencer')}
                > 
                    <ButtonText>SignUp as Influencer</ButtonText>
                </Button>

                <Button 
                    mt={2} onPress={() => navigation.push('SignUpBusiness')}
                > 
                    <ButtonText>SignUp as Business</ButtonText>
                </Button>

            </VStack>
        </Center>
      );
};

export default Login;