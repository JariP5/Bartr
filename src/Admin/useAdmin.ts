import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { InfluencerDataType, InfluencerType } from '../Types/Influencer';

const useAdmin = () => {
    const [unverifiedInfluencers, setUnverifiedInfluencers] = useState<InfluencerType[]>([]);
    
    useEffect(() => {
        const fetchUnverifiedUsers = async () => {
            try {
                const querySnapshot = await firestore()
                .collection('influencer') 
                .where('verified', '==', false)
                .get();

                const influencersData: InfluencerType[] = [];

                querySnapshot.forEach((documentSnapshot) => {
                    const influencerData = documentSnapshot.data() as InfluencerDataType;

                    influencersData.push({id: documentSnapshot.id, data: influencerData});
                    console.log('Influencer document data:', influencerData);
                });

                setUnverifiedInfluencers(influencersData);
            } catch (error) {
                console.error('Error querying user documents:', error);
            }
        };

        // Call the function
        fetchUnverifiedUsers();
    }, []); 

    const verifyInfluencer = async (userId: string) => {
        try {
            firestore()
            .collection('influencer')
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
        verifyInfluencer
    }
};

export default useAdmin;