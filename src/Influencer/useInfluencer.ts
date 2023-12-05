import { RouteProp, useRoute } from '@react-navigation/native';
import { StackParamList } from '../Navigation/Params';

function useInfluencer() {
  const route = useRoute<RouteProp<StackParamList, 'Influencer'>>();  
  const { user } = route.params

  return {
    user
  }
}

export default useInfluencer;