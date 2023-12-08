import React from "react";
import SwitchSelector from "react-native-switch-selector-fix";

type Props = {
    toggleUser: (value: number) => void
}

function Switch({ toggleUser }: Props) {
    
    const options = [
        { label: "Influencers", value: 0 },
        { label: "Businesses", value: 1 } 
    ]

    return(
        <SwitchSelector
            options={options}
            initial={0}
            onPress={(value) => toggleUser(value as number)}
            textColor={'black'}
            selectedColor={'yellow'}
            buttonColor={'red'}
            backgroundColor={'green'}
            borderColor={'blue'}
            hasPadding
            buttonMargin={2}
        />
    );
}

export default Switch;