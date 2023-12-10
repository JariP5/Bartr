import firestore from '@react-native-firebase/firestore';
import { useCallback, useEffect, useState } from "react";
import { useUserContext } from '../../../Context/User';
import { DealDataType, DealType } from '../../../Types/Deal';


const useDeals = () => {
    const { user } = useUserContext();
    const [acceptedDeals, setAcceptedDeals] = useState<DealType[]>([]);
    const [completedDeals, setCompletedDeals] = useState<DealType[]>([]);
    const [requestedDeals, setRequestedDeals] = useState<DealType[]>([]);
    const [declinedDeals, setDeclinedDeals] = useState<DealType[]>([]);
    const [activeValue, setActiveValue] = useState<number>(0);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchDeals();
        
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
  
    useEffect(() => {
        fetchDeals();
    }, []); 

    const fetchDeals = async () => {
        try {
            const querySnapshot = await firestore()
            .collection('deal') 
            .where('businessId', '==', user!.id)
            .get();

            const accepted: DealType[] = [];
            const requested: DealType[] = [];
            const completed: DealType[] = [];
            const declined: DealType[] = [];

            querySnapshot.forEach((documentSnapshot) => {
                const deal = documentSnapshot.data() as DealDataType;

                if (deal.status === 'accepted') {
                    accepted.push({id: documentSnapshot.id, data: deal});
                } else if (deal.status === 'requested') {
                    requested.push({id: documentSnapshot.id, data: deal});
                } else if (deal.status === 'completed') {
                    completed.push({id: documentSnapshot.id, data: deal});
                } else if (deal.status === 'declined') {
                    declined.push({id: documentSnapshot.id, data: deal});
                }
            });

            setAcceptedDeals(accepted);
            setRequestedDeals(requested);
            setCompletedDeals(completed);
            setDeclinedDeals(declined);
        } catch (error) {
            console.error('Error querying user documents:', error);
        }
    };

    const acceptDeal = async (deal: DealType) => {
        try {
            firestore()
            .collection('deal')
            .doc(deal.id)
            .set({
                status: "accepted",
            }, { merge: true });

            moveDealToAccepted(deal);
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    const declineDeal = async (deal: DealType) => {
        try {
            firestore()
            .collection('deal')
            .doc(deal.id)
            .set({
                status: "declined",
            }, { merge: true });

            moveDealToDeclined(deal);
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };


    const moveDealToAccepted = (movingDeal: DealType) => {
        // Remove from requested
        const updatedList = requestedDeals.filter(deal => deal.id !== movingDeal.id);
        setRequestedDeals(updatedList);

        // Add to accepted
        const modifiedMovingDeal = { ...movingDeal, status: 'accepted' };
        setAcceptedDeals(prevAcceptedDeals => [...prevAcceptedDeals, modifiedMovingDeal]);
    };

    const moveDealToDeclined = (movingDeal: DealType) => {
        // Remove from requested
        const updatedList = requestedDeals.filter(deal => deal.id !== movingDeal.id);
        setRequestedDeals(updatedList);

        // Add to declined
        const modifiedMovingDeal = { ...movingDeal, status: 'declined' };
        setDeclinedDeals(prevDeclinedDeals => [...prevDeclinedDeals, modifiedMovingDeal]);
    };

    // value == 0 -> new team selected is home team
    function toggleSwitch(value: number) {
        if (value != activeValue) {
            setActiveValue(value);
        }
    }

    return {
        acceptedDeals,
        requestedDeals,
        completedDeals,
        declinedDeals,
        activeValue,
        toggleSwitch,
        acceptDeal,
        declineDeal,
        onRefresh, 
        refreshing
    }
};

export default useDeals;