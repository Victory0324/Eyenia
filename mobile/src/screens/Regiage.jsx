
import React, { useState } from 'react'
import {
  SafeAreaView, StyleSheet, View, ToastAndroid,
  TouchableOpacity, Alert, Image, Text, StatusBar, Modal
} from 'react-native'

import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "@expo/vector-icons/Ionicons";

import { useSelector, useDispatch } from 'react-redux';
import { deleteVehicle, setDataPeriod, sendGprsIgnition, sendGprsRestart, sendGprsReset } from '../actions/vehicles';
import LoadingComponent from '../components/Loading';

export default function Regiage({ navigation, route }) {
  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.auth);
  const vehicleReducer = useSelector(state => state.vehicles);

  const { infos } = route.params;

  const [isShowModal, setIsShowModal] = useState(false);
  const handleTrackMode = () => {
    setIsShowModal(true);
  }

  const setPeriod = (value) => {
    dispatch(setDataPeriod(value));
    setIsShowModal(false);
  }

  const showBluetoothDevices = () => {
    if (infos.bluetooth) {
      Alert.alert(
        'Bluetooth Info',
        `${infos.bluetooth}`,
        [
          {
            text: 'Close',
            onPress: () => Alert.dismiss(),
          },
        ],
      );
    }
    else {
      ToastAndroid.show(
        'Any bluetooth device does not exist.',
        ToastAndroid.SHORT
      );
    }
  }

  const handleIgnition = () => {
    const newIgnition = abs(infos.ignition - 1);
    dispatch(sendGprsIgnition(newIgnition));
  }

  const handleRestart = () => {
    dispatch(sendGprsRestart());
  }

  const handleResetCommand = () => {
    dispatch(sendGprsReset());
  }

  const handleDeleteVehicle = () => {
    Alert.alert(
      'Warning',
      'Are you going to delete this vehicle?',
      [
        {
          text: 'Yes',
          onPress: () => removeVehicle(),
        },
        {
          text: 'No',
          onPress: () => Alert.dismiss(),
        },
      ],
    );
  }

  const removeVehicle = () => {
    dispatch(deleteVehicle(userReducer.token, infos.deviceImei, navigation));
  }

  return (
    <SafeAreaView style={{ marginTop: 10, marginBottom: 25, flex: 1, backgroundColor: '#F9F9F9' }}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <LoadingComponent isLoading={vehicleReducer.isRemovingVehicle} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isShowModal}
        onRequestClose={() => {
          setIsShowModal(false);
        }}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setPeriod(3)}>
            <Text style={{ padding: 5 }}>
              3s
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPeriod(5)}>
            <Text style={{ padding: 5 }}>
              5s
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPeriod(10)}>
            <Text style={{ padding: 5 }}>
              10s
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPeriod(15)}>
            <Text style={{ padding: 5 }}>
              15s
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setIsShowModal(false)
          }}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#18567F', width: wp('90%'), height: hp('8.5%'), borderRadius: 10, alignSelf: 'center' }}>
        <View style={{ marginLeft: 20, }}>
          <Text style={{ fontSize: 20, fontWeight: '300', color: '#FFFF' }}>{infos.vehicleName}</Text>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: 'column', marginTop: hp('5.5%') }}>
        <TouchableOpacity style={styles.v3} onPress={() => handleTrackMode()}>
          <View style={styles.v5}>
            <View style={styles.v2}>
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name="map-marker" size={16} color="#18567F" />
              </IconComponentProvider>
            </View>
            <Text style={styles.v6}>Tracking mode</Text>
          </View>
          <View>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
              <Icon name="chevron-right" size={20} color="#000000" style={{}} />
            </IconComponentProvider>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.v3} onPress={() => navigation.navigate('NotificationSetting', { "infos": infos })}>
          <View style={styles.v5}>
            <View style={styles.v2}>
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name="bell-badge" size={16} color="#18567F" />
              </IconComponentProvider>
            </View>
            <Text style={styles.v6}>Notifications</Text>
          </View>
          <View>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
              <Icon name="chevron-right" size={20} color="#000000" style={{}} />
            </IconComponentProvider>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.v3} onPress={() => navigation.navigate('Membership', { "infos": infos })}>
          <View style={styles.v5}>
            <View style={styles.v2}>
              <Image source={require('../../assets/frame.png')} style={{ width: 12, height: 9 }} />
            </View>
            <Text style={styles.v6}>Abonnement</Text>
          </View>
          <View>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
              <Icon name="chevron-right" size={20} color="#000000" style={{}} />
            </IconComponentProvider>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.v3} onPress={showBluetoothDevices}>
          <View style={styles.v5}>
            <View style={styles.v2}>
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name="bluetooth" size={16} color="#18567F" />
              </IconComponentProvider>
            </View>
            <Text style={styles.v6}>Appareils Associe</Text>
          </View>
          <View>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
              <Icon name="chevron-right" size={20} color="#000000" style={{}} />
            </IconComponentProvider>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.v3} onPress={handleIgnition}>
          <View style={styles.v5}>
            <View style={styles.v2}>
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name="car" size={16} color="#18567F" />
              </IconComponentProvider>
            </View>
            <Text style={styles.v6}>Coupure Circuit</Text>
          </View>
          <View>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
              <Icon name="chevron-right" size={20} color="#000000" style={{}} />
            </IconComponentProvider>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.v3} onPress={handleRestart}>
          <View style={styles.v5}>
            <View style={styles.v2}>
              <Image source={require('../../assets/monitor.png')} style={{ width: 12, height: 11 }} />
            </View>
            <Text style={styles.v6}>Redemarer</Text>
          </View>
          <View>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
              <Icon name="chevron-right" size={20} color="#000000" style={{}} />
            </IconComponentProvider>
          </View>
        </TouchableOpacity>

        <View style={styles.v3}>
          <View style={styles.v5}>
            <View style={styles.v2}>
              <IconComponentProvider IconComponent={Ionicons}>
                <Icon name="ios-speedometer-outline" size={16} color="#18567F" />
              </IconComponentProvider>
            </View>
            <Text style={styles.v6}>Speed Alert</Text>
          </View>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Text style={{ color: '#18567F', fontSize: 12, fontWeight: '600' }}>100Km/h</Text>
          </IconComponentProvider>
        </View>

        <TouchableOpacity style={styles.v3} onPress={handleResetCommand}>
          <View style={styles.v5}>
            <View style={styles.v2}>
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name="history" size={16} color="#18567F" />
              </IconComponentProvider>
            </View>
            <Text style={styles.v6}>Reset</Text>
          </View>
          <View>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
              <Icon name="chevron-right" size={20} color="#000000" style={{}} />
            </IconComponentProvider>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.v3} onPress={handleDeleteVehicle}>
          <View style={styles.v5}>
            <View style={styles.v2}>
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name="trash-can-outline" size={16} color="#18567F" />
              </IconComponentProvider>
            </View>
            <Text style={styles.v6}>Delete the Device</Text>
          </View>
          <View>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
              <Icon name="chevron-right" size={20} color="#000000" style={{}} />
            </IconComponentProvider>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  t1: {
    fontSize: 14,
    fontWeight: '500',
    alignSelf: "center",
    textAlign: 'center',
    justifyContent: 'center'
  },
  to1: {
    position: 'absolute',
    width: 30,
    height: 30,
    left: 5,
    borderRadius: wp('10%'),
    borderWidth: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  v1: {
    backgroundColor: '#18567F',
    borderRadius: 10,
    width: 320,
    height: 70,
    margin: 10,
    marginHorizontal: 20
  },
  v2: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#18567F21',
    justifyContent: 'center',
    alignItems: 'center'
  },
  v3: {
    flexDirection: 'row',
    marginLeft: 20,
    flex: 1,
    justifyContent: 'space-between',
    width: wp('90%'),
    marginBottom: hp('3%')

  },
  newCar: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: hp('87%'),
    alignItems: 'center',
    backgroundColor: '#18567F',
    justifyContent: 'center',
    borderRadius: 15,
    alignSelf: 'center',
    elevation: 5,
    zIndex: 100
  },
  tabView: {
    width: '100%',
    height: hp('8%'),
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 19,
    position: 'absolute',
    top: hp('90%'),
    zIndex: 99
  },
  detailHeader: {
    flexDirection: 'row',
    position: 'relative',
    marginTop: hp('5.5%'),
    marginBottom: hp('3.5%'),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  v5: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  v6: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 10
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7021a',
    padding: 100
  }
})