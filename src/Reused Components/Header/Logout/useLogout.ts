import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useUserContext } from '../../../Context/User';
import { StackParamList } from '../../../Navigation/Params';

const useLogout = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();
    const { logoutUser } = useUserContext();

    const handleLogout = async () => {

        try {

            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
            logoutUser();
          } catch (error) {
            console.error('Error logging out:', error);
          }
    };

    

    return {
        handleLogout
    }
};

export default useLogout;