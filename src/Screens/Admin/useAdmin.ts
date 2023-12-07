import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { UserDataType, UserType } from '../../Types/User';

const useAdmin = () => {
    const [unverifiedInfluencers, setUnverifiedInfluencers] = useState<UserType[]>([]);
    const [unverifiedBusinesses, setUnverifiedBusinesses] = useState<UserType[]>([]);
    
    useEffect(() => {
        const fetchUnverifiedUsers = async () => {
            try {
                const querySnapshot = await firestore()
                .collection('users') 
                .where('verified', '==', false)
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

                setUnverifiedBusinesses(businesses)
                setUnverifiedInfluencers(influencers);
            } catch (error) {
                console.error('Error querying user documents:', error);
            }
        };

        fetchUnverifiedUsers();
    }, []); 

    const verifyUser = async (userId: string) => {
        try {
            firestore()
            .collection('user')
            .doc(userId)
            .set({
                verified: true,
            }, { merge: true });
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    return {
        unverifiedInfluencers,
        unverifiedBusinesses,
        verifyUser,
    }
};

export default useAdmin;