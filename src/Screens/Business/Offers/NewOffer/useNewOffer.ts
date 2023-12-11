import firestore from '@react-native-firebase/firestore';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useState } from "react";
import { useUserContext } from '../../../../Context/User';
import { StackParamList } from '../../../../Navigation/Params';

const useNewOffer = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<StackParamList, 'NewOffer'>>(); 
    const { onRefresh } = route.params;
    const { user } = useUserContext();
    const [title, setTitle] = useState<string>("");
    const [task, setTask] = useState<string>("");
    const [reward, setReward] = useState<string>("");

    const handlePost = async () => {

        try {
            firestore()
            .collection('offer')
            .add({
                businessId: user!.id,
                status: "live",
                title: title,
                task: task,
                reward: reward
            });
            navigation.goBack();
            onRefresh();
            
        } catch (error) {
            console.error('Could not post offer:', error);
        }
    };

    return {
        setTitle, 
        setTask, 
        setReward,
        handlePost
    }
};

export default useNewOffer;