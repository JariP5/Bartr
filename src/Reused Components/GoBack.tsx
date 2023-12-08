import { useNavigation } from "@react-navigation/native";

import { ArrowLeftIcon, Pressable, View } from "@gluestack-ui/themed";
import React from "react";

function GoBack() {
    const navigation = useNavigation();

    return(
        <View w={20}>
            <Pressable
                $pressed={{opacity: 0.5}}
                onPress={() => navigation.goBack()}
            > 
                <ArrowLeftIcon size={'xl'} />
            </Pressable>
        </View>
    );
}

export default GoBack;
