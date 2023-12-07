import firestore from '@react-native-firebase/firestore';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StackParamList } from '../../Navigation/Params';
import { InfluencerDataType } from '../../Types/Influencer';


function useInfluencer() {
  const route = useRoute<RouteProp<StackParamList, 'Influencer'>>();  
  const { userId } = route.params
  const [userData, setUserData] = useState<InfluencerDataType | undefined>(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const userDoc = await firestore().collection('influencer').doc(userId).get()
            console.log(userId)
            if (userDoc.exists) {
                console.log("exists")
                const userData = userDoc.data() as InfluencerDataType;
                setUserData(userData);
            } else {
                console.log('Document does not exist');
            }
        } catch (error) {
            console.error('Error querying user documents:', error);
        }
    };

    // Call the function
    fetchUserData();
}, [userId]); 

  return {
    userData
  }
}

export default useInfluencer;