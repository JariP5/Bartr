import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useState } from "react";
import { StackParamList } from '../../Navigation/Params';

const useLogin = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [validCredentials, setValidCredentials] = useState<Boolean>(true);
    const adminEmail = "admin@bartr.com";
    const adminPassword = "bartr";

    // Check if the user is logged in when the component mounts
    useEffect(() => {
      checkLoginStatus();
    }, []);

    // Function to check if the user is logged in
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const role = await AsyncStorage.getItem('role')
        // Check if the user token is present to determine if the user is logged in
        if (userToken) {
          if (role === 'admin') {
            navigation.push('Admin');
          } else if (role === 'influencer') {
            navigation.push('Influencer', {
              userId: userToken
            });
          } else if (role === 'business') {
            navigation.push('Business', {
              userId: userToken
            });
          }
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    const handleLogin = async () => {

        if (email === adminEmail && password === adminPassword) {
            navigation.push('Admin');
            return;
        }

        try {
          const response = await auth().signInWithEmailAndPassword(email, password);
          console.log(response)
          const role = response.user.displayName ?? "";
          await AsyncStorage.setItem('userToken', response.user.uid);
          await AsyncStorage.setItem('role', role);
          if (role === "influencer") {
            navigation.push('Influencer', {
              userId: response.user.uid,
            })
          } else if (role === "business"){
            navigation.push('Business', {
              userId: response.user.uid,
            })
          }
          
          
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