import { Center } from "@gluestack-ui/themed";
import Header from "../../Reused Components/Header/Header";
import Loading from "../../Reused Components/Loading";
import RenderBasedOnUser from "../BasedOn/RenderBasedOnUser";
import useHome from "./useHome";

const Home = () => {
    const {
        user
    } = useHome();

    if (!user) {
        <Loading />
    }

    return (
        <Center w={"100%"} mt={200}>
            <Header/>
            <RenderBasedOnUser/>
        </Center>
    );
};

export default Home;