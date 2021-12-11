import { Box, Text, Center, ScrollView, Image } from 'native-base'
import React from 'react'
import styles from './AdminHome.style'
import AntDesgin from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const AdminHome = () => {
    const navigation = useNavigation()
    return (
        <ScrollView>
            <Center mt="5" px="3">
                <Box w="100%" p="10px">
                    <Box>
                        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('UserInfo')}>
                            <Box style={styles.mainBox}>
                                <Text style={styles.text}>User Info</Text>
                                <AntDesgin name='arrowright' style={styles.icon} size={23} color='black' />
                            </Box>
                        </TouchableOpacity >
                        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('FarmOwnerInfo')}>
                            <Box style={styles.mainBox}>
                                <Text style={styles.text}>Farm Owner Info</Text>
                                <AntDesgin name='arrowright' style={styles.icon} size={23} color='black' />
                            </Box>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('CateringInfo')}>
                            <Box style={styles.mainBox}>
                                <Text style={styles.text}>Catering Info</Text>
                                <AntDesgin name='arrowright' style={styles.icon} size={23} color='black' />
                            </Box>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('TranspoterInfo')}>
                            <Box style={styles.mainBox}>
                                <Text style={styles.text}>Transpoter Info</Text>
                                <AntDesgin name='arrowright' style={styles.icon} size={23} color='black' />
                            </Box>
                        </TouchableOpacity>
                    </Box>
                </Box>
            </Center>
        </ScrollView>
    )
}

export default AdminHome
