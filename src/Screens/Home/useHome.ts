import { useUserContext } from "../../Context/User";

const useHome = () => {
    const { user } = useUserContext();

    return {
        user
    }
};

export default useHome;