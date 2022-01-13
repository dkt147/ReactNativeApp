import React from 'react'
import { Box, Text, Center, ScrollView, Image, Button } from 'native-base'
import { Linking } from 'react-native'
export default function VentorReg() {
    const whatsapp = () => {
        let url =
            'whatsapp://send?text=' +
            '&phone=92' + "3172746242";
        Linking.openURL(url)
            .then((data) => {
                console.log('WhatsApp Opened');
            })
    }
    return (
        <ScrollView>
            <Center flex={1} px="3">
                <Box w="100%" p="10px">
                    <Box p='5' mt='50%'>
                        <Text fontSize='24' fontFamily='Merriweather' textAlign="center">For Ventor's Registration Please Contact This Number</Text>
                    </Box>
                    <Button mt='10%' borderRadius='20' onPress={() => whatsapp()}>Contact US</Button>
                </Box>
            </Center></ScrollView>
    )
}
