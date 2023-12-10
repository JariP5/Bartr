import { View } from "@gluestack-ui/themed";
import { useUserContext } from "../../Context/User";
import Header from "../../Reused Components/Header/Header";
import Loading from "../../Reused Components/Loading";
import RenderBasedOnUser from "../BasedOn/User";

const Home = () => {
    const { user } = useUserContext();

    if (user === undefined) {
        return <Loading />;
    }
    
    return (
        <View flex={1} bgColor="red">
            <Header/>
            <RenderBasedOnUser/>
        </View>
    );
};

export default Home;