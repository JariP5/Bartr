import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { BusinessDataType, BusinesssType } from '../Types/Business';
import { InfluencerDataType, InfluencerType } from '../Types/Influencer';

const useAdmin = () => {
    const [unverifiedInfluencers, setUnverifiedInfluencers] = useState<InfluencerType[]>([]);
    const [unverifiedBusinesses, setUnverifiedBusinesses] = useState<BusinesssType[]>([]);
    
    useEffect(() => {
        const fetchUnverifiedInfluencers = async () => {
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

        const fetchUnverifiedBusinesses = async () => {
            try {
                const querySnapshot = await firestore()
                .collection('business') 
                .where('verified', '==', false)
                .get();

                const businessesData: BusinesssType[] = [];

                querySnapshot.forEach((documentSnapshot) => {
                    const businessData = documentSnapshot.data() as BusinessDataType;

                    businessesData.push({id: documentSnapshot.id, data: businessData});
                    console.log('Influencer document data:', businessData);
                });

                setUnverifiedBusinesses(businessesData);
            } catch (error) {
                console.error('Error querying user documents:', error);
            }
        };

        fetchUnverifiedBusinesses();
        fetchUnverifiedInfluencers();
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

    const verifyBusiness = async (userId: string) => {
        try {
            firestore()
            .collection('business')
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
        verifyInfluencer,
        unverifiedBusinesses,
        verifyBusiness
    }
};

export default useAdmin;