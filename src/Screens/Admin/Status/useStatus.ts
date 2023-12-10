import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { useCallback, useContext, useState } from "react";
import { AdminContext } from '../../../Context/Admin';
import { UserType } from '../../../Types/User';


const useStatus = () => {
    const route = useRoute();  
    const status = route.name.toLowerCase();
    const { users, fetchUsers, updateUserStatus } = useContext(AdminContext)!;
    const [activeValue, setActiveValue] = useState<number>(0);
    const [refreshing, setRefreshing] = useState(false);
    const relevantUsers: UserType[] = users.filter(user => user.data.status === status);
    const options: { label: string; value: number }[]  = [
        {label: "Influencer", value: 0},
        {label: "Business", value: 1},
    ]
    const shownUsers = relevantUsers.filter(user => user.data.role === options[activeValue].label);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchUsers();
        
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const acceptUser = async (user: UserType) => {
        try {
            firestore()
            .collection('user')
            .doc(user.id)
            .set({
                status: "accepted",
            }, { merge: true });

            updateUserStatus(user.id, "accepted");
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    const declineUser = async (user: UserType) => {
        try {
            firestore()
            .collection('user')
            .doc(user.id)
            .set({
                status: "declined",
            }, { merge: true });

            updateUserStatus(user.id, "declined");
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    const waitUser = async (user: UserType) => {
        try {
            firestore()
            .collection('user')
            .doc(user.id)
            .set({
                status: "waiting",
            }, { merge: true });

            updateUserStatus(user.id, "waiting");
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    // value == 0 -> new team selected is home team
    function toggleSwitch(value: number) {
        if (value != activeValue) {
            setActiveValue(value);
        }
    }

    return {
        shownUsers,
        options,
        toggleSwitch,
        acceptUser,
        declineUser,
        waitUser,
        onRefresh, 
        refreshing,
        status
    }
};

export default useStatus;