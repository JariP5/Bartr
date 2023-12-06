import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from "react";
import { StackParamList } from '../Navigation/Params';

const useLogin = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [validCredentials, setValidCredentials] = useState<Boolean>(true);
    const adminEmail = "admin@bartr.com";
    const adminPassword = "bartr";

    const handleLogin = async () => {

        if (email === adminEmail && password === adminPassword) {
            navigation.push('Admin');
            return;
        }

        try {
          const response = await auth().signInWithEmailAndPassword(email, password);
          console.log(response)
          navigation.push('Influencer', {
            userId: response.user.uid,
          })
        } catch (error) {
          console.error('Sign-in error:', error);
          setValidCredentials(false);
        }
    };

    return {
        setEmail, 
        setPassword,
        handleLogin, 
        validCredentials,
        navigation
    }
};

export default useLogin;