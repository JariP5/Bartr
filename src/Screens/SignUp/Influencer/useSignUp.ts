import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from "react";
import { InfluencerType } from '../../../Types/Influencer';
import { UserDataType } from '../../../Types/User';

const useSignUpInfluencer = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [instagram, setInstagram] = useState<string>("");
    const [birthday, setBirthday] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");
    const [validCredentials, setValidCredentials] = useState<Boolean>(true);
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
                displayName: firstName,
            });
            
            const influencerInfo = getInfluencerInfo();
            firestore()
            .collection('user')
            .doc(response.user.uid)
            .set(influencerInfo)

            setShowModal(true);
        } catch (error) {
            console.error('Sign-up error:', error);
        }
    };

    function getInfluencerInfo() {
        const influencerData: InfluencerType = {
            firstName: firstName,
            lastName: lastName,
            birthday: "21.03.2000",
        }

        const userData: UserDataType = {
            verified: false,
            role: 'Influencer',
            email: email,
            displayName: firstName,
            instagram: instagram,
            influencer: influencerData
        }

        return userData;
    }


    function isValidEmail(email: string) {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return {
        setFirstName, 
        setLastName, 
        setBirthday,
        setInstagram,
        setEmail, 
        setPassword,
        setConfirmedPassword, 
        validCredentials,
        handleSignUp,
        showModal
    }
};

export default useSignUpInfluencer;