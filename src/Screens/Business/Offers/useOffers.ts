import firestore from '@react-native-firebase/firestore';
import { useCallback, useEffect, useState } from "react";
import { useUserContext } from '../../../Context/User';
import { OfferDataType, OfferStatusType, OfferType } from '../../../Types/Offer';


const useBusinessOffers = () => {
    const { user } = useUserContext();
    const [offers, setOffers] = useState<OfferType[]>([]);
    const [activeValue, setActiveValue] = useState<number>(0);
    const [refreshing, setRefreshing] = useState(false);
    const options: { label: string; value: number }[]  = [
        {label: "Live", value: 0},
        {label: "Paused", value: 1}
    ]
    const shownOffers = offers.filter(offer => offer.data.status === options[activeValue].label.toLowerCase());

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
            .where('businessId', '==', user!.id)
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

    const startOffer = async (offer: OfferType) => {
        try {
            firestore()
            .collection('offer')
            .doc(offer.id)
            .set({
                status: "live"
            }, { merge: true });

            updateOfferStatus(offer.id, "live");
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };


    const pauseOffer = async (offer: OfferType) => {
        try {
            firestore()
            .collection('offer')
            .doc(offer.id)
            .set({
                status: "paused"
            }, { merge: true });

            updateOfferStatus(offer.id, "paused");
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    const updateOfferStatus = (offerId: string, status: OfferStatusType) => {
        // Find the index of the offer with the given ID
        const index = offers.findIndex((offer) => offer.id === offerId);
      
        if (index !== -1) {
          // Create a copy of the offer at the found index with updated status and modified date
          const updatedOffer: OfferType = {
            ...offers[index],
            data: {
              ...offers[index].data,
              status: status
            },
          };
      
          // Create a new array with the updated offer
          const updatedOffers: OfferType[] = [...offers];
          updatedOffers[index] = updatedOffer;
      
          // Update state with the new array
          setOffers(updatedOffers);
        }
    };


    // value == 0 -> new team selected is home team
    function toggleSwitch(value: number) {
        if (value != activeValue) {
            setActiveValue(value);
        }
    }

    return {
        shownOffers,
        options,
        toggleSwitch,
        startOffer,
        pauseOffer,
        onRefresh, 
        refreshing
    }
};

export default useBusinessOffers;