import firestore from '@react-native-firebase/firestore';
import { useCallback, useEffect, useState } from "react";
import { UserDataType, UserType } from '../../../Types/User';

const useWaiting = () => {
    const [waitingInfluencers, setWaitingInfluencers] = useState<UserType[]>([]);
    const [waitingBusinesses, setWaitingBusinesses] = useState<UserType[]>([]);
    const [activeValue, setActiveValue] = useState<number>(0);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      // Refresh logic goes here
      fetchWaitingUsers();
    }, []);
  
    useEffect(() => {
      fetchWaitingUsers();
    }, []); 
  
    const fetchWaitingUsers = async () => {
      try {
        setRefreshing(true); // Start refreshing indicator
  
        const querySnapshot = await firestore()
          .collection("user")
          .where("status", "==", "waiting")
          .get();
  
        const influencers: UserType[] = [];
        const businesses: UserType[] = [];
  
        querySnapshot.forEach((documentSnapshot) => {
          const user = documentSnapshot.data() as UserDataType;
  
          if (user.role === "Influencer") {
            influencers.push({ id: documentSnapshot.id, data: user });
          } else if (user.role === "Business") {
            businesses.push({ id: documentSnapshot.id, data: user });
          }
        });
  
        setWaitingBusinesses(businesses);
        setWaitingInfluencers(influencers);
      } catch (error) {
        console.error("Error querying user documents:", error);
      } finally {
        setRefreshing(false); // Stop refreshing indicator
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

            removeUserFromWaitingList(user);
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

            removeUserFromWaitingList(user);
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    const removeUserFromWaitingList = (userToRemove: UserType) => {
        // Filter out the user to be removed
        if (userToRemove.data.role === "Influencer") {
            const updatedWaitingList = waitingInfluencers.filter(user => user.id !== userToRemove.id);
            setWaitingInfluencers(updatedWaitingList);
        } else if (userToRemove.data.role === "Business") {
            const updatedWaitingList = waitingBusinesses.filter(user => user.id !== userToRemove.id);
            setWaitingBusinesses(updatedWaitingList);
        }
        
    };

    // value == 0 -> new team selected is home team
    function toggleUser(value: number) {
        if (value != activeValue) {
            setActiveValue(value);
        }
    }

    return {
        waitingInfluencers,
        waitingBusinesses,
        activeValue,
        toggleUser,
        acceptUser,
        declineUser,
        refreshing, 
        onRefresh
    }
};

export default useWaiting;