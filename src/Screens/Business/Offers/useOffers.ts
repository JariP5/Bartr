import firestore from '@react-native-firebase/firestore';
import { useCallback, useEffect, useState } from "react";
import { useUserContext } from '../../../Context/User';
import { OfferDataType, OfferType } from '../../../Types/Offer';


const useOffers = () => {
    const { user } = useUserContext();
    const [liveOffers, setLiveOffers] = useState<OfferType[]>([]);
    const [pausedOffers, setPausedOffers] = useState<OfferType[]>([]);
    const [activeValue, setActiveValue] = useState<number>(0);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchOffers();
        
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
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

            const live: OfferType[] = [];
            const paused: OfferType[] = [];

            querySnapshot.forEach((documentSnapshot) => {
                const offer = documentSnapshot.data() as OfferDataType;

                if (offer.status === 'live') {
                    live.push({id: documentSnapshot.id, data: offer});
                } else if (offer.status === 'paused') {
                    paused.push({id: documentSnapshot.id, data: offer});
                }
            });

            setLiveOffers(live);
            setPausedOffers(paused);
        } catch (error) {
            console.error('Error querying user documents:', error);
        }
    };

    const startOffer = async (offer: OfferType) => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', { timeZone: 'UTC' });
        try {
            firestore()
            .collection('offer')
            .doc(offer.id)
            .set({
                status: "live",
                modified: formattedDate
            }, { merge: true });

            moveOfferFromPausedToLive(offer, formattedDate);
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };


    const pauseOffer = async (offer: OfferType) => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', { timeZone: 'UTC' });
        try {
            firestore()
            .collection('offer')
            .doc(offer.id)
            .set({
                status: "paused",
                modified: formattedDate
            }, { merge: true });

            moveOfferFromLiveToPaused(offer, formattedDate);
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    const moveOfferFromLiveToPaused = (movingOffer: OfferType, date: string) => {
        // Remove from live
        const updatedList = liveOffers.filter(offer => offer.id !== movingOffer.id);
        setLiveOffers(updatedList);

        // Add to paused
        const modifiedMovingOffer = { ...movingOffer, status: 'paused', modified: date};
        const updatedPausedOffers: OfferType[] = [...pausedOffers, modifiedMovingOffer];
        setPausedOffers(updatedPausedOffers);
        console.log("Paused");
        console.log(updatedList);
        console.log(updatedPausedOffers);
    };

    const moveOfferFromPausedToLive = (movingOffer: OfferType, date: string) => {
        // Remove from paused
        const updatedList = pausedOffers.filter(offer => offer.id !== movingOffer.id);
        setPausedOffers(updatedList);

        // Add to live
        const modifiedMovingOffer = { ...movingOffer, status: 'live', modified: date };
        const updatedLiveOffers: OfferType[] = [...liveOffers, modifiedMovingOffer];
        setLiveOffers(updatedLiveOffers);
        console.log("Live");
        console.log(updatedList);
        console.log(updatedLiveOffers);
    };

    // value == 0 -> new team selected is home team
    function toggleSwitch(value: number) {
        if (value != activeValue) {
            setActiveValue(value);
        }
    }

    return {
        liveOffers,
        pausedOffers,
        activeValue,
        toggleSwitch,
        startOffer,
        pauseOffer,
        onRefresh, 
        refreshing
    }
};

export default useOffers;