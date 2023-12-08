import firestore from '@react-native-firebase/firestore';
import { useCallback, useEffect, useState } from "react";
import { UserDataType, UserType } from '../../../Types/User';

const useDeclined = () => {
    const [declinedInfluencers, setDeclinedInfluencers] = useState<UserType[]>([]);
    const [declinedBusinesses, setDeclinedBusinesses] = useState<UserType[]>([]);
    const [activeValue, setActiveValue] = useState<number>(0);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      // Refresh logic goes here
      fetchDeclinedUsers();
    }, []);
  
    useEffect(() => {
        fetchDeclinedUsers();
    }, []); 

    const fetchDeclinedUsers = async () => {
        try {
            const querySnapshot = await firestore()
            .collection('user') 
            .where('status', '==', 'declined')
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

            setDeclinedBusinesses(businesses)
            setDeclinedInfluencers(influencers);
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

            removeUserFromDeclinedList(user);
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

            removeUserFromDeclinedList(user);
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    const removeUserFromDeclinedList = (userToRemove: UserType) => {
        // Filter out the user to be removed
        if (userToRemove.data.role === "Influencer") {
            const updateddeclinedList = declinedInfluencers.filter(user => user.id !== userToRemove.id);
            setDeclinedInfluencers(updateddeclinedList);
        } else if (userToRemove.data.role === "Business") {
            const updateddeclinedList = declinedBusinesses.filter(user => user.id !== userToRemove.id);
            setDeclinedBusinesses(updateddeclinedList);
        }
        
    };

    // value == 0 -> new team selected is home team
    function toggleUser(value: number) {
        if (value != activeValue) {
            setActiveValue(value);
        }
    }

    return {
        declinedInfluencers,
        declinedBusinesses,
        activeValue,
        toggleUser,
        acceptUser,
        waitUser,
        onRefresh, 
        refreshing
    }
};

export default useDeclined;