import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from "react";
import { StackParamList } from '../Navigation/Params';
import { InfluencerDataType } from '../Types/Influencer';

const useSignUp = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");
    const [validCredentials, setValidCredentials] = useState<Boolean>(true);
    const [selectedEntity, setSelectedEntity] = useState('influencer');

    const handleSignUp = async () => {
        if (password !== confirmedPassword) {
            setValidCredentials(false);
            return;
        }
        if (!isValidEmail(email)) return;

        try {
            const response = await auth().createUserWithEmailAndPassword(email, password);
            const userInformation: InfluencerDataType = {
                firstName: firstName,
                lastName: lastName,
                birthday: "21.03.2000",
                instagram: "jpolm",
                followers: 300,
                verified: false,
                email: email
            }
            firestore()
            .collection(selectedEntity)
            .doc(response.user.uid)
            .set(userInformation)
            navigation.push("SignUpSuccess");
        } catch (error) {
            console.error('Sign-up error:', error);
        }
    };

    const handleRadioChange = (value: string) => {
        setSelectedEntity(value);
    };

    function isValidEmail(email: string) {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return {
        setFirstName, 
        setLastName, 
        setEmail, 
        setPassword,
        setConfirmedPassword, 
        validCredentials,
        selectedEntity,
        handleSignUp,
        handleRadioChange
    }
};

export default useSignUp;