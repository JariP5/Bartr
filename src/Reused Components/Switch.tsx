import React from "react";
import SwitchSelector from "react-native-switch-selector-fix";

type Props = {
    toggleSwitch: (value: number) => void
    options: { label: string; value: number }[] 
}

function Switch({ toggleSwitch, options}: Props) {


    return(
        <SwitchSelector
            options={options}
            initial={0}
            onPress={(value) => toggleSwitch(value as number)}
            textColor={'black'}
            selectedColor={'white'}
            buttonColor={'blue'}
            backgroundColor={'lightblue'}
            borderColor={'white'}
            hasPadding
            buttonMargin={2}
        />
    );
}

export default Switch;