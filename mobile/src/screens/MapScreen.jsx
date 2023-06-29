
import React, { useState, useEffect, useRef } from 'react';
import { Button, View, Text, SafeAreaView, StatusBar, ToastAndroid, Platform, Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MapView, { Marker, Callout } from 'react-native-maps';
import WebView from 'react-native-webview';
import * as Notifications from 'expo-notifications';
import PagerView from 'react-native-pager-view';
import { signals } from '../constants/signals';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useSelector, useDispatch } from 'react-redux'
import { showVehicles } from '../actions/vehicles';
import { addNotifications } from '../actions/notifications';


const GOOGLE_MAPS_API_KEY = 'AIzaSyD9vdLrtEtIZ-U2i8tRqMVyrI0J_KbfeDk';

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch()
  const userReducer = useSelector(state => state.auth);
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const [showPanel, setPanelShow] = useState(false);
  const closePanel = () => {
    setPanelShow(false);
    toggleCallOut();
    setManualPageIndex(null);
    setCurrentPageIndex(0);
  }
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  //mapmode
  const [mapType, setMapType] = useState('standard');
  const mapRef = useRef(null);
  const toggleMapType = () => {
    const newMapType = (mapType === 'standard') ? 'satellite' : 'standard';
    console.log(newMapType);
    setMapType(newMapType);
  }

  //google view mode
  const [googleView, setGoogleView] = useState(false);
  const [streetViewUrl, setStreetViewUrl] = useState('');
  const markerRef = useRef(null);
  const calloutRef = useRef(null);
  const toggleGoogleView = () => {
    setGoogleView(!googleView);
    if (streetViewUrl === '') { showToast(); }
  }

  const handleNotification = (type, vehicle) => {
    //save alert
    const time = new Date();
    dispatch(addNotifications(userReducer.token, userReducer.user.id, type, vehicle, time));
    Notifications.scheduleNotificationAsync({
      content: {
        title: type,
        body: `${vehicle}-${time}`,
      },
      trigger: null,
    });
  }
  //display vehicles
  const renderMarkers = (vehicles) => {
    for (let index = 0; index < vehicles.length; index++){
      const vehicle = vehicles[index];
      if(vehicle.teltonikas.length > 0){
        if(vehicle.isVibration && !vehicle.teltonikas[0].ignition){
          handleNotification("Vibration", vehicle.vehicleName)
        }
        if(vehicle.isMovement && vehicle.teltonikas[0].movement == 1){
          handleNotification("Movement", vehicle.vehicleName)
        }
        if(vehicle.isStop && vehicle.teltonikas[0].movement == 0){
          handleNotification("Stop", vehicle.vehicleName)
        }
        if(vehicle.isOverSpeed && vehicle.teltonikas[0].speed > 100){
          handleNotification("OverSpeed", vehicle.vehicleName)
        }
        if(vehicle.isDetachment && vehicle.teltonikas[0].battery == 0){
          handleNotification("Detachment", vehicle.vehicleName)
        }
      }
    }
    if (vehicles.length > 0) {
      return vehicles.map((vehicle) => (
        (vehicle.teltonikas.length > 0) ? (
          <Marker
            key={vehicle.id}
            ref={markerRef}
            coordinate={{ latitude: vehicle.teltonikas[0].lat, longitude: vehicle.teltonikas[0].lng }}
            onPress={(event) => {
              console.log("marker position::::", event.nativeEvent.coordinate);
              onMarkPress(event.nativeEvent.coordinate, vehicle);
            }}
          >
            {zoomLevel <= 10 && (
              <View >
                <Image style={{width:0,height:0}} source={require('../../assets/car-medium.png')} />
              </View>
            )}
            {zoomLevel > 10 && zoomLevel <= 15 && (
              <View style={selectedMarkerId === vehicle.id ? {borderWidth: 0.8, borderColor: 'red',alignItems:'center'} : {alignItems:'center'}}>
                <Image style={{width:21,height:12}} source={require('../../assets/car-large.png')} />
              </View>
            )}
            {zoomLevel > 15 && zoomLevel <=18 && (
              <View style={selectedMarkerId === vehicle.id ? {borderWidth: 0.8, borderColor: 'red',alignItems:'center'} : {alignItems:'center'}}>
                <Image style={{width:28,height:14}} source={require('../../assets/car-large.png')} />
              </View>
            )}
            {zoomLevel > 18 && (
              <View style={selectedMarkerId === vehicle.id ? {borderWidth: 0.8, borderColor: 'red',alignItems:'center'} : {alignItems:'center'}}>
                <Image style={{width:42,height:24}} source={require('../../assets/car-large.png')} />
              </View>
            )}


            <Callout ref={calloutRef} anchor={{ x: 0.5, y: 1 }}>
              <View style={styles.callout}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#18567F', marginTop: 3 }}>{vehicle.vehicleName}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <IconComponentProvider IconComponent={Ionicons}>
                    <Icon name="ios-speedometer-outline" size={16} color="#444" />
                  </IconComponentProvider>
                  <Text style={{ marginLeft: 4, fontSize: 12 }}>{vehicle.teltonikas[0].speed}km/h</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ) : null
      ));
    }
  }

  //hide panel
  const onMapPress = () => {
    setPanelShow(false);
    setSelectedMarkerId(null);
    setManualPageIndex(null);
    setCurrentPageIndex(0);
  }

  //set vehicle press event
  const onMarkPress = async (coordinate, vehicle) => {
    setSelectedVehicle(vehicle);
    const { latitude, longitude } = coordinate;
    const radius = 50;
    const response = await fetch(`https://maps.googleapis.com/maps/api/streetview/metadata?location=${latitude},${longitude}&radius=${radius}&key=${GOOGLE_MAPS_API_KEY}`);
    const data = await response.json();

    if (data.status === 'OK') {
      const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latitude},${longitude}&heading=0&pitch=0`;
      setStreetViewUrl(url);
    }
    else {
      setStreetViewUrl('');
      if (googleView) showToast();
    }

    setPanelShow(true);
    toggleCallOut();
    setSelectedMarkerId(vehicle.id);
  }

  const toggleCallOut = () => {
    if (markerRef.current && calloutRef.current) {
      if (!showPanel) {
        setTimeout(() => { // Use setTimeout to ensure map has adjusted to marker position before animating the callout open.
          markerRef.current.showCallout();
        }, 0);
      } else {
        markerRef.current.hideCallout();
      }
    }
  }

  function StreetView() {
    console.log("url::::", streetViewUrl);
    return (
      <WebView style={styles.streetViewContainer} source={{ uri: streetViewUrl }} />
    );
  }

  const showToast = () => {
    // Show toast message using react-native-toast-message
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravityAndOffset(
        'No Street View available!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } else {
      Toast.show({
        text1: 'No Street View available!',
        type: 'error',
        position: 'bottom',
      });
    }
  }

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [manualPageIndex, setManualPageIndex] = useState(null);
  const hadlePageChange = (event) => {
    console.log("Dfdfsdf:", event.nativeEvent.position);
    setManualPageIndex(event.nativeEvent.position);
    setCurrentPageIndex(event.nativeEvent.position);
  }
  //viewpager
  function PanelPager() {
    //check connection state : transfer date is in 5 mins from now, connected
    let connectStatus = true;
    let diffMin = 0;
    const teltonika = selectedVehicle.teltonikas[0];
    if (selectedVehicle.teltonikas.length > 0) {
      const date1 = new Date(teltonika.timestamp);
      const date2 = new Date();
      diffMin = (date2.getTime() - date1.getTime()) / 60000;
      if (diffMin > 5) {
        connectStatus = false;
      }
    }

    return (
      <View style={styles.viewPagerContainer}>
        <PagerView style={styles.viewPager} initialPage={manualPageIndex !== null ? manualPageIndex : currentPageIndex} onPageSelected={(event) => hadlePageChange(event)}>
          <View key="1" style={styles.cardview}>
            <TouchableOpacity style={styles.closeview} onPress={closePanel}>
              <Image source={require('../../assets/close.png')} />
            </TouchableOpacity>
            <View style={styles.panel1}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../assets/car1.png')} style={{ width: 18, height: 18 }} />
                  <Text style={{ fontSize: 15, color: '#18567F', marginLeft: 4 }}>{selectedVehicle.vehicleName}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../assets/battery.png')} style={{ width: 20, height: 20 }} />
                  <Text style={{ fontSize: 10, marginLeft: 1 }}>{selectedVehicle.teltonikas[0] ? selectedVehicle.teltonikas[0].battery : 0}%</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../assets/meter.png')} style={{ width: 16, height: 16 }} />
                  <Text style={{ fontSize: 10, fontWeight: '400', marginLeft: 3 }}>{selectedVehicle.teltonikas[0] ? selectedVehicle.teltonikas[0].speed : 0}km/h</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../assets/fuel.png')} style={{ width: 16, height: 16 }} />
                  <Text style={{ fontSize: 10, fontWeight: '400', marginLeft: 3 }}>{selectedVehicle.teltonikas[0] ? selectedVehicle.teltonikas[0].fuel : 0}L</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../assets/network.png')} style={{ width: 16, height: 16 }} />
                  <Text style={{ fontSize: 10, fontWeight: '400', marginLeft: 3 }}>{selectedVehicle.teltonikas[0] ? signals[selectedVehicle.teltonikas[0].signal] : 'None'}</Text>
                </View>
              </View>

              <Text style={{ fontSize: 8, fontWeight: '400', color: connectStatus?'green':'red', marginTop: 7 }}>{connectStatus?"En mouvement" : `Ew Arret ${diffMin}min`}</Text>

              <Text style={{ fontSize: 9, fontWeight: '400', marginTop: 7 }}>
                {selectedVehicle.teltonikas[0] ? selectedVehicle.teltonikas[0].address : 0}
              </Text>
            </View>

          </View>
          <View key="2" style={styles.cardview}>
            <TouchableOpacity style={styles.closeview} onPress={closePanel}>
              <Image source={require('../../assets/close.png')} />
            </TouchableOpacity>
            <View style={styles.panel2}>
              <TouchableOpacity style={styles.v42} onPress={() => { navigation.navigate('Historique2',{ "infos": selectedVehicle }) }}>
                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                  <Icon name="map-outline" size={24} color="#5D5C59" />
                </IconComponentProvider>
                <Text style={styles.t2}>Historique</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.v42} onPress={() => { navigation.navigate('Zone_dalerte', { "infos": selectedVehicle }) }}>
                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                  <Icon name="pound" size={24} color="#5D5C59" />
                </IconComponentProvider>
                <Text style={styles.t2}>Zone d'alerteone</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.v42} onPress={() => { navigation.navigate('Details', { "infos": selectedVehicle }) }}>
                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                  <Icon name="format-list-text" size={24} color="#5D5C59" />
                </IconComponentProvider>
                <Text style={styles.t2}>Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.v42} onPress={() => { navigation.navigate('Regiage', { "infos": selectedVehicle }) }}>
                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                  <Icon name="cog" size={24} color="#5D5C59" />
                </IconComponentProvider>
                <Text style={styles.t2}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </PagerView>
      </View>
    );
  };
  //reducers

  const vehicleReducer = useSelector(state => state.realtimeVehicles);

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    if (userReducer !== null && userReducer.user !== null && userReducer.user.id !== null) {
      const interval = setInterval(() => {
        dispatch(showVehicles(userReducer.token, userReducer.user.id));
        setTime(new Date().toLocaleTimeString()); // Update the state with current time
        setManualPageIndex(null);
      }, vehicleReducer.receivePeriod); // Set the interval time here

      // Return a cleanup function to clear the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [vehicleReducer.receivePeriod]); // Add any dependencies that you need here

  const [region, setRegion] = useState({
    latitude: 24.3137433,
    longitude: 54.53741,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [zoomLevel, setZoomLevel] = useState(15);
  const [selectedMarkerId, setSelectedMarkerId]=useState(null)
  const handleMapRegionChange = (region) => {
    // Calculate the current zoom level of the map based on the longitude delta:
    const LONGITUDE_DELTA_THRESHOLD = 0.01;
    const currentZoomLevel = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
    console.log("zoom level::::", currentZoomLevel);
    setZoomLevel(currentZoomLevel);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFF', marginTop: 25 }}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      {googleView && streetViewUrl &&
        <StreetView />
      }

      <MapView
        ref={mapRef}
        mapType={mapType} // Set the initial map type
        initialRegion={region}
        style={styles.map}
        onRegionChangeComplete={handleMapRegionChange}
        onPress={onMapPress}>
        {vehicleReducer && vehicleReducer.vehicles && renderMarkers(vehicleReducer.vehicles)}
      </MapView>

      <View style={[styles.optionContainer, { top: hp('28%') }]}>
        <TouchableOpacity style={[styles.optionview, {}]} onPress={toggleMapType}>
          <Image source={require('../../assets/map1.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.optionview, { marginTop: hp('2%') }]} onPress={toggleGoogleView}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="map-marker-account-outline" size={30} color="#000000" />
          </IconComponentProvider>

        </TouchableOpacity>
        <TouchableOpacity style={[styles.optionview, { marginTop: hp('2%') }]}>
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>10s</Text>
        </TouchableOpacity>
      </View>

      {showPanel &&
        <PanelPager />
      }

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  map: {
    position: 'relative',
    width: '100%',
    height: '100%',
    flex: 1
  },
  streetViewContainer: {
    // position:'absolute',
    // top:0,
    // left:0,
    width: '100%',
    height: '20%',
    // marginHorizontal: 10,
  },
  img1: {
    width: wp('96%'),
    height: hp('24%'),
    margin: wp('2%'),
    borderRadius: 5,
    marginTop: 5
  },
  carview: {
    width: wp('26%'),
    height: hp('7%'),
    backgroundColor: '#FFFF',
    alignItems: 'center',
    position: 'absolute',
    top: hp('34%'),
    alignSelf: 'center',
    borderRadius: 5
  },
  optionContainer: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    width: wp('10%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    right: wp('5%'),
    height: hp('15%'),
    top: hp('6%')
  },
  optionview: {
    backgroundColor: 'white',
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  newCar: {
    width: 40,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#18567F',
    justifyContent: 'center',
    borderRadius: 15,
    alignSelf: 'center',
    elevation: 10,
    zIndex: 100,
    marginBottom: hp('9%'),
  },
  tabView: {
    width: '100%',
    height: hp('7%'),
    alignSelf: 'center',
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: 'center',
    paddingHorizontal: 0,
    position: 'absolute',
    top: hp('89%'),
    zIndex: 99
  },
  viewPagerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: hp('20%'),

    marginBottom: 20,
  },
  viewPager: {
    flex: 1,
    width: wp('90%'),
    alignSelf: 'center',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardview: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFF',
  },
  closeview: {
    position: 'absolute',
    width: 14.5,
    height: 14.5,
    backgroundColor: 'white',
    top: 10,
    right: 10,
    borderColor: 'black',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  panel1: {
    flex: 1,
    marginHorizontal: wp('10%'),
  },
  panel2: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: wp('10%'),
    justifyContent: 'space-between'
  },
  v42: {
    alignItems: 'center'
  },
  t2: {
    fontSize: 9,
    marginTop: 8
  },
  callout: {
    backgroundColor: 'white',
    padding: 0,
    borderRadius: 5,
    flex: 1,
  },
});