import firestore from '@react-native-firebase/firestore';
import { useCallback, useEffect, useState } from "react";
import { useUserContext } from '../../../Context/User';
import { OfferDataType, OfferType } from '../../../Types/Offer';


const useInfluencerOffers = () => {
    const { user } = useUserContext();
    const [offers, setOffers] = useState<OfferType[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchOffers();
        
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
  
    useEffect(() => {
        fetchOffers();
    }, []); 

    const fetchOffers = async () => {
        try {
            const querySnapshot = await firestore()
            .collection('offer') 
            .where('status', '==', 'live')
            .get();

            const fetchedOffers: OfferType[] = [];

            querySnapshot.forEach((documentSnapshot) => {
                const offer = documentSnapshot.data() as OfferDataType;
                fetchedOffers.push({id: documentSnapshot.id, data: offer});
            });

            setOffers(fetchedOffers);
        } catch (error) {
            console.error('Error querying user documents:', error);
        }
    };

    const requestDeal = async (offer: OfferType) => {
        // create new deal
        
        try {
            firestore()
            .collection('deal')
            .add({
                offerId: offer.id,
                businessId: offer.data.businessId,
                influencerId: user!.id,
                status: "requested",
                title: offer.data.title
            });

        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };


    return {
        offers,
        requestDeal,
        onRefresh, 
        refreshing
    }
};

export default useInfluencerOffers;