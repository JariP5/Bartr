import firestore from '@react-native-firebase/firestore';
import { useCallback, useEffect, useState } from "react";
import { useUserContext } from '../../../Context/User';
import { DealDataType, DealStatusType, DealType } from '../../../Types/Deal';


const useDeals = () => {
    const { user } = useUserContext();
    const [deals, setDeals] = useState<DealType[]>([]);
    const [activeValue, setActiveValue] = useState<number>(0);
    const [refreshing, setRefreshing] = useState(false);
    const options: { label: string; value: number }[]  = [
        {label: "Live", value: 0},
        {label: "Requested", value: 1},
        {label: "Completed", value: 2},
        {label: "Declined", value: 3}
    ]
    const shownDeals = deals.filter(deal => deal.data.status === options[activeValue].label.toLowerCase());

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchDeals();
        
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
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

            const fetchedDeals: DealType[] = [];

            querySnapshot.forEach((documentSnapshot) => {
                const fetchedDeal = documentSnapshot.data() as DealDataType;
                fetchedDeals.push({id: documentSnapshot.id, data: fetchedDeal});
            });

            setDeals(fetchedDeals);
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
                status: "live",
            }, { merge: true });

            updateDealStatus(deal.id, "live");
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

            updateDealStatus(deal.id, "declined");
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };
    
    const updateDealStatus = (dealId: string, status: DealStatusType) => {
        // Find the index of the offer with the given ID
        const index = deals.findIndex((deal) => deal.id === dealId);
      
        if (index !== -1) {
          // Create a copy of the offer at the found index with updated status and modified date
          const updatedDeal: DealType = {
            ...deals[index],
            data: {
              ...deals[index].data,
              status: status,
            },
          };
      
          // Create a new array with the updated offer
          const updatedDeals: DealType[] = [...deals];
          updatedDeals[index] = updatedDeal;
      
          // Update state with the new array
          setDeals(updatedDeals);
        }
    };

    // value == 0 -> new team selected is home team
    function toggleSwitch(value: number) {
        if (value != activeValue) {
            setActiveValue(value);
        }
    }

    return {
        shownDeals,
        options,
        toggleSwitch,
        acceptDeal,
        declineDeal,
        onRefresh, 
        refreshing
    }
};

export default useDeals;