import { Button, Center, Input, InputField, Text, VStack } from '@gluestack-ui/themed';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from "react";
import { StackParamList } from './Navigation/Params';


const Login = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [validCredentials, setValidCredentials] = useState<Boolean>(true);

    function handleLogin() {
        setValidCredentials(false);
    }


    return (
        <Center w={"100%"}>
    
            <VStack mt={200}>

                <Input w={200}>
                    <InputField onChangeText={value => setUserName(value)}/>
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