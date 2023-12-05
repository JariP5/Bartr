import { Button, Center, Input, InputField, Text, VStack } from '@gluestack-ui/themed';
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
        console.log('handleLogin')
        try {
          const response = await auth().signInWithEmailAndPassword(email, password);
          console.log('User signed in:', response.user);
        } catch (error) {
          console.error('Sign-in error:', error);
          setValidCredentials(false);
        }
    };


    return (
        <Center w={"100%"}>
    
            <VStack mt={200}>

                <Input w={200}>
                    <InputField onChangeText={value => setEmail(value)}/>
                </Input>

                <Input w={200}>
                    <InputField type="password" onChangeText={value => setPassword(value)}/>
                </Input>

                {!validCredentials && <Text>Invalid Credentials</Text>}

                <Button mt={2} onPress={() => handleLogin()}></Button>

            </VStack>
        </Center>
      );
};

export default Login;