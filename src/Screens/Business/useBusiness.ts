import { useUserContext } from "../../Context/User";


function useBusiness() {
  const { user } = useUserContext();

  return {
    user
  }
}

export default useBusiness;