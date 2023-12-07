import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from "react";
import { BusinessDataType } from '../../Types/Business';
import { InfluencerDataType } from '../../Types/Influencer';

const useSignUp = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");
    const [validCredentials, setValidCredentials] = useState<Boolean>(true);
    const [selectedEntity, setSelectedEntity] = useState('influencer');
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleSignUp = async () => {
        if (password !== confirmedPassword) {
            setValidCredentials(false);
            return;
        }
        if (!isValidEmail(email)) {
            console.log("Fake email");
            return;
        }

        try {
            const response = await auth().createUserWithEmailAndPassword(email, password);
            // Set display name
            await response.user.updateProfile({
                displayName: selectedEntity,
            });
            
            const userInfo = getUserInfo();
            firestore()
            .collection(selectedEntity)
            .doc(response.user.uid)
            .set(userInfo)

            setShowModal(true);
        } catch (error) {
            console.error('Sign-up error:', error);
        }
    };

    function getUserInfo() {
        if (selectedEntity === "influencer") {
            const influencerInfo: InfluencerDataType = {
                firstName: firstName,
                lastName: lastName,
                birthday: "21.03.2000",
                instagram: "jpolm",
                followers: 300,
                verified: false,
                email: email
            }
            return influencerInfo;
        } else {
            const businessInfo: BusinessDataType = {
                name: firstName,
                birthday: "21.03.2000",
                instagram: "jpolm",
                followers: 300,
                verified: false,
                email: email
            }
            return businessInfo;
        }
    }

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
        handleRadioChange,
        showModal, 
        setShowModal
    }
};

export default useSignUp;