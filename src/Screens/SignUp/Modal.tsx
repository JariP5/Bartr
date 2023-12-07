import { CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalHeader, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from "react";
import { StackParamList } from '../../Navigation/Params';

type Props = {
    showModal: boolean
}

const SignUpModal = ({ showModal }: Props) => {
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();
    const ref = React.useRef(null);

    return (
        <Modal
            isOpen={showModal}
            onClose={() => {
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
      );
};

export default SignUpModal;