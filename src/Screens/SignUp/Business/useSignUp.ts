import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from "react";
import { BusinessType } from '../../../Types/Business';
import { UserDataType } from '../../../Types/User';

const useSignUpBusiness = () => {
    const [companyName, setCompanyName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [instagram, setInstagram] = useState<string>("");
    const [location, setLocation] = useState<string>("");
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
                displayName: companyName,
            });
            
            const businessInfo = getBusinessInfo();
            firestore()
            .collection('user')
            .doc(response.user.uid)
            .set(businessInfo)

            setShowModal(true);
        } catch (error) {
            console.error('Sign-up error:', error);
        }
    };

    function getBusinessInfo() {
        const businessData: BusinessType = {
            companyName: companyName,
            location: location,
        }

        const userData: UserDataType = {
            status: "waiting",
            role: 'Business',
            email: email,
            displayName: companyName,
            instagram: instagram,
            business: businessData
        }

        return userData;
    }


    function isValidEmail(email: string) {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return {
        setCompanyName, 
        setLocation, 
        setInstagram,
        setEmail, 
        setPassword,
        setConfirmedPassword, 
        validCredentials,
        handleSignUp,
        showModal
    }
};

export default useSignUpBusiness;