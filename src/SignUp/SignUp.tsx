import { Button, ButtonText, Center, CircleIcon, Input, InputField, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, Text, VStack } from '@gluestack-ui/themed';
import React from "react";
import useSignUp from './useSignUp';

const SignUp = () => {
    const {
        setFirstName, 
        setLastName,
        setEmail, 
        setPassword,
        setConfirmedPassword, 
        selectedEntity,
        validCredentials,
        handleSignUp,
        handleRadioChange
    } = useSignUp();

    return (
        <Center w={"100%"}>
    
            <VStack mt={200} space={'xs'}>

                <Input w={200}>
                    <InputField placeholder={"First Name"} onChangeText={value => setFirstName(value)}/>
                </Input>

                <Input w={200}>
                    <InputField placeholder={"Last Name"} onChangeText={value => setLastName(value)}/>
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

                <RadioGroup value={selectedEntity} onChange={handleRadioChange}>
                    <Radio value="influencer" size="md" isInvalid={false} isDisabled={false}>
                        <RadioIndicator mr="$2">
                            <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Influencer</RadioLabel>
                    </Radio>

                    <Radio value="business" size="md" isInvalid={false} isDisabled={false}>
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