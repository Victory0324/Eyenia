import React, { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, Image, View, StatusBar, StyleSheet, Slider, TextInput } from 'react-native'
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';

function Profile({ navigation }) {
    const userReducer = useSelector(state => state.auth);

    const [val, setVal] = useState(0.3)

    const onValueChange = (newValue) => {
        setVal(newValue);
    };

    return (
        <SafeAreaView style={styles.v1}> 
            <StatusBar backgroundColor={'#18567F'} barStyle={'light'} />
            <View style={{flex:1}}>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>Username</Text>
                    <Text style={styles.listString}>{userReducer.user.name}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>Email</Text>
                    <Text style={styles.listString}>{userReducer.user.email}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>Phone Number</Text>
                    <Text style={styles.listString}>{userReducer.user.phone}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>Password</Text>
                    < IconComponentProvider IconComponent={MaterialCommunityIcons} style={{flexDirection: 'row',alignItems: 'center',alignSelf: "center"}}>
                        <Icon name="chevron-right" size={20} style={{alignSelf: 'center'}} />
                    </IconComponentProvider>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>Language</Text>
                    < IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="chevron-right" size={20} style={{}} />
                    </IconComponentProvider>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>Maps</Text>
                    < IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="chevron-right" size={20} style={{}} />
                    </IconComponentProvider>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>Help</Text>
                    < IconComponentProvider IconComponent={MaterialCommunityIcons} >
                        <Icon name="chevron-right" size={20} style={{}} />
                    </IconComponentProvider>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>About Us</Text>
                    {/* <View style={{flex:1, justifyContent: 'space-between', alignItems:'center'}}> */}
                    < IconComponentProvider IconComponent={MaterialCommunityIcons} style={{}}>
                        <Icon name="chevron-right" size={20} style={{}} />
                    </IconComponentProvider>
                    {/* </View> */}
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>Term and condition</Text>
                    < IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="chevron-right" size={20} style={{}} />
                    </IconComponentProvider>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>Deconnexion</Text>
                    < IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="chevron-right" size={20} style={{}} />
                    </IconComponentProvider>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Profile
const styles = StyleSheet.create({
    v1: {
        flex: 1,
        backgroundColor: 'white'
    },
    t1: {
        fontSize: 14,
        fontWeight: '400',
        color: '#FFFF',
        alignSelf: 'center',
        textAlign: 'center',
        paddingTop: hp('4%')
    },
    to1: {
        position: 'absolute',
        width: 30,
        height: 30,
        left: 30,
        top: hp('4%'),
        borderRadius: 40,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFF',
        borderColor: '#FFFF'
    },
    detailHeader: {
        flexDirection: 'row',
        position: 'relative',
        marginVertical: hp('4%'),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listHeader: {
        fontSize: 12,
        fontWeight: '400',
        color: '#18567F',
        alignSelf: 'center',
        textAlign: 'center',
        opacity: 0.8,
        marginTop: 4
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        width: wp('85%'),
        alignSelf: 'center',
        // paddingVertical: 6,
        marginTop: hp('2%'),
    },
    listString: {
        fontSize: 12,
        fontWeight: '400',
        color: '#000000C4',
        alignSelf: 'center',
        textAlign: 'center',
        
    },
    listTitle: {
        fontSize: 15,
        fontWeight: '400',
        color: '#111111',
        alignSelf: 'center',
        textAlign: 'center',
        
    }
})