import React from "react";
import SwitchSelector from "react-native-switch-selector-fix";

type Props = {
    toggleSwitch: (value: number) => void
    labels: string[]
}

function Switch({ toggleSwitch, labels}: Props) {

    const createOptions = (labels: string[]) => {
        return labels.map((label, index) => ({
          label: label,
          value: index,
        }));
    };

    const options = createOptions(labels);

    return(
        <SwitchSelector
            options={options}
            initial={0}
            onPress={(value) => toggleSwitch(value as number)}
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