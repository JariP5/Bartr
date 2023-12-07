import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../../Navigation/Params';

const useLogout = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const handleLogout = async () => {

        try {
            // Clear the user token from storage
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('role');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
          } catch (error) {
            console.error('Error logging out:', error);
          }
    };

    

    return {
        handleLogout
    }
};

export default useLogout;