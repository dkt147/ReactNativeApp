import { Box, Text, Center, ScrollView, Image } from 'native-base'
import React from 'react'
import styles from './TransportHome.style'
import AntDesgin from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const TransportHome = () => {
    const navigation = useNavigation()
    return (
        <ScrollView>
            <Center mt="5" px="3">
                <Box w="100%" p="10px">
                    <Box>
                        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('TransportOrder')}>
                            <Box style={styles.mainBox}>
                                <Text style={styles.text}>Order</Text>
                                <AntDesgin name='arrowright' style={styles.icon} size={23} color='black' />
                            </Box>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('TransportOrderConfrom')}>
                            <Box style={styles.mainBox}>
                                <Text style={styles.text}>Confirm Order</Text>
                                <AntDesgin name='arrowright' style={styles.icon} size={23} color='black' />
                            </Box>
                        </TouchableOpacity>
                    </Box>
                </Box>
            </Center>
        </ScrollView>
    )
}

export default TransportHome
