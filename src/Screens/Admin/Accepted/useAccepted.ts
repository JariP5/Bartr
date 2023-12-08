import firestore from '@react-native-firebase/firestore';
import { useCallback, useEffect, useState } from "react";
import { UserDataType, UserType } from '../../../Types/User';

const useAccepted = () => {
    const [acceptedInfluencers, setAcceptedInfluencers] = useState<UserType[]>([]);
    const [acceptedBusinesses, setAcceptedBusinesses] = useState<UserType[]>([]);
    const [activeValue, setActiveValue] = useState<number>(0);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      // Refresh logic goes here
      fetchAcceptedUsers();
    }, []);
  
    useEffect(() => {
        fetchAcceptedUsers();
    }, []); 

    const fetchAcceptedUsers = async () => {
        try {
            const querySnapshot = await firestore()
            .collection('user') 
            .where('status', '==', 'accepted')
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

            setAcceptedBusinesses(businesses)
            setAcceptedInfluencers(influencers);
        } catch (error) {
            console.error('Error querying user documents:', error);
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

            removeUserFromAcceptedList(user);
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

            removeUserFromAcceptedList(user);
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    const removeUserFromAcceptedList = (userToRemove: UserType) => {
        // Filter out the user to be removed
        if (userToRemove.data.role === "Influencer") {
            const updatedacceptedList = acceptedInfluencers.filter(user => user.id !== userToRemove.id);
            setAcceptedInfluencers(updatedacceptedList);
        } else if (userToRemove.data.role === "Business") {
            const updatedAcceptedList = acceptedBusinesses.filter(user => user.id !== userToRemove.id);
            setAcceptedBusinesses(updatedAcceptedList);
        }
        
    };

    // value == 0 -> new team selected is home team
    function toggleUser(value: number) {
        if (value != activeValue) {
            setActiveValue(value);
        }
    }

    return {
        acceptedInfluencers,
        acceptedBusinesses,
        activeValue,
        toggleUser,
        declineUser,
        waitUser,
        onRefresh, 
        refreshing
    }
};

export default useAccepted;