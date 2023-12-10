import firestore from '@react-native-firebase/firestore';
import { useCallback, useEffect, useState } from "react";
import { useUserContext } from '../../../Context/User';
import { DealDataType, DealType } from '../../../Types/Deal';


const useInfluencerDeals = () => {
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
            .where('influencerId', '==', user!.id)
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
        onRefresh, 
        refreshing
    }
};

export default useInfluencerDeals;