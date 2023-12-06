import { Button, ButtonText, Center, Input, InputField, Text, VStack } from '@gluestack-ui/themed';
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from "react";
import { StackParamList } from './Navigation/Params';


const Login = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [validCredentials, setValidCredentials] = useState<Boolean>(true);

    const handleLogin = async () => {
        try {
          const response = await auth().signInWithEmailAndPassword(email, password);
          navigation.push('Influencer', {
            user: response.user.email?.toString(),
          })

        } catch (error) {
          console.error('Sign-in error:', error);
          setValidCredentials(false);
        }
    };

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
                    mt={5} onPress={() => navigation.push('SignUp')}
                > 
                    <ButtonText>SignUp</ButtonText>
                </Button>

            </VStack>
        </Center>
      );
};

export default Login;