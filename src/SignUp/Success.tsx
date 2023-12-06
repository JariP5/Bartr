import { Center, Text, VStack } from '@gluestack-ui/themed';
import React from "react";

const SignUpSuccess = () => {

    return (
        <Center w={"100%"}>
    
            <VStack mt={200} space={'xs'}>

                <Text>Congratulations</Text>
                <Text>We will verify your data and send you an email when your account is activated.</Text>

            </VStack>
        </Center>
      );
};

export default SignUpSuccess;