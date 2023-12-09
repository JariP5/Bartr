import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useState } from "react";
import { UserDataType, UserType } from '../../../Types/User';


const useStatus = () => {
    const route = useRoute();  
    const status = route.name.toLowerCase();
    const [influencers, setInfluencers] = useState<UserType[]>([]);
    const [businesses, setBusinesses] = useState<UserType[]>([]);
    const [activeValue, setActiveValue] = useState<number>(0);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchUsers();
        
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
  
    useEffect(() => {
        fetchUsers();
    }, []); 

    const fetchUsers = async () => {
        try {
            const querySnapshot = await firestore()
            .collection('user') 
            .where('status', '==', status)
            .get();

            const influencers: UserType[] = [];
            const businesses: UserType[] = [];

            querySnapshot.forEach((documentSnapshot) => {
                const user = documentSnapshot.data() as UserDataType;

                if (user.role === 'Influencer') {
                    influencers.push({id: documentSnapshot.id, data: user});
                } else if (user.role === 'Business') {
                    businesses.push({id: documentSnapshot.id, data: user});
                }
            });

            setBusinesses(businesses)
            setInfluencers(influencers);
        } catch (error) {
            console.error('Error querying user documents:', error);
        }
    };

    const acceptUser = async (user: UserType) => {
        try {
            firestore()
            .collection('user')
            .doc(user.id)
            .set({
                status: "accepted",
            }, { merge: true });

            removeUserFromList(user);
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

            removeUserFromList(user);
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

            removeUserFromList(user);
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    const removeUserFromList = (userToRemove: UserType) => {
        // Filter out the user to be removed
        if (userToRemove.data.role === "Influencer") {
            const updatedList = influencers.filter(user => user.id !== userToRemove.id);
            setInfluencers(updatedList);
        } else if (userToRemove.data.role === "Business") {
            const updatedList = businesses.filter(user => user.id !== userToRemove.id);
            setBusinesses(updatedList);
        }
        
    };

    // value == 0 -> new team selected is home team
    function toggleUser(value: number) {
        if (value != activeValue) {
            setActiveValue(value);
        }
    }

    return {
        influencers,
        businesses,
        activeValue,
        toggleUser,
        acceptUser,
        declineUser,
        waitUser,
        onRefresh, 
        refreshing,
        status
    }
};

export default useStatus;