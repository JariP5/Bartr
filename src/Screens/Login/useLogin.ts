import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from "react";
import { useUserContext } from '../../Context/User';
import { StackParamList } from '../../Navigation/Params';

const useLogin = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [validCredentials, setValidCredentials] = useState<Boolean>(true);
    const { fetchUser } = useUserContext();


    const handleLogin = async () => {


        try {
          const response = await auth().signInWithEmailAndPassword(email, password);
          await AsyncStorage.setItem('userToken', response.user.uid);
          fetchUser(response.user.uid);
          navigation.push('Home')
          
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