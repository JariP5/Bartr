import { Button, ButtonText, Center, CircleIcon, CloseIcon, Heading, Icon, Input, InputField, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalHeader, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, Text, VStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from "react";
import { StackParamList } from '../Navigation/Params';
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
        handleRadioChange,
        showModal,
        setShowModal
    } = useSignUp();

    const navigation = useNavigation<StackNavigationProp<StackParamList>>();
    const ref = React.useRef(null);

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

                <Modal
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false);
                        navigation.navigate('Login');
                    }}
                    finalFocusRef={ref}
                >
                    <ModalBackdrop />
                    <ModalContent>
                        <ModalHeader>
                            <Heading size='lg'>Succesfull sign up!</Heading>
                            <ModalCloseButton>
                                <Icon as={CloseIcon} />
                            </ModalCloseButton>
                        </ModalHeader>
                        <ModalBody>
                            <Text >
                            We will verify your account within the next 48 hours.
                            </Text>
                        </ModalBody>
                    </ModalContent>
                </Modal>

            </VStack>
        </Center>
      );
};

export default SignUp;