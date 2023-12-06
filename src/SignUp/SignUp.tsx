import { Button, ButtonText, Center, CircleIcon, Input, InputField, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, Text, VStack } from '@gluestack-ui/themed';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from "react";
import { StackParamList } from '../Navigation/Params';

const SignUp = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");
    const [validCredentials, setValidCredentials] = useState<Boolean>(true);
    const [selectedEntity, setSelectedEntity] = useState('Influencer');

    const handleSignUp = async () => {
        if (password !== confirmedPassword) {
            setValidCredentials(false);
            return;
        }

        try {
            const response = await auth().createUserWithEmailAndPassword(email, password);
            firestore().collection('users').doc(response.user.uid).set({
                firstName: "Jari",
                lastName: "Polm",
                birthday: "21.03.2000",
                email: email
            })
            navigation.push("SignUpSuccess");
        } catch (error) {
            console.error('Sign-up error:', error);
        }
    };

    const handleRadioChange = (value: string) => {
        setSelectedEntity(value);
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
                <Input w={200}>
                    <InputField placeholder={"Confirm Password"} type="password" onChangeText={value => setConfirmedPassword(value)}/>
                </Input>

                <RadioGroup value={selectedEntity} onChange={handleRadioChange}>
                    <Radio value="Influencer" size="md" isInvalid={false} isDisabled={false}>
                        <RadioIndicator mr="$2">
                            <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Influencer</RadioLabel>
                    </Radio>

                    <Radio value="Business" size="md" isInvalid={false} isDisabled={false}>
                        <RadioIndicator mr="$2">
                            <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Business</RadioLabel>
                    </Radio>
                </RadioGroup>
 

                {!validCredentials && <Text color='red'>Passwords do not match</Text>}

                <Button 
                    mt={2} onPress={() => handleSignUp()}
                > 
                    <ButtonText>SignUp</ButtonText>
                </Button>

            </VStack>
        </Center>
      );
};

export default SignUp;