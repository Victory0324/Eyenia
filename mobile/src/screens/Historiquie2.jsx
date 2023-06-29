import React from 'react'
import { SafeAreaView, StatusBar, View, TouchableOpacity, Image, Text, StyleSheet, ProgressBarAndroid } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function Historiquie2({ navigation, route }) {
  const { infos } = route.params;
  
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'#18567F'} barStyle={'light'} />
      <MapView
        initialRegion={{
          latitude: 30.733315,
          longitude: 76.779419,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        style={{ width: wp('97%'), height: hp('90%'), borderRadius: 10, alignSelf: 'center', margin: 5 }}>
        <Marker draggable coordinate={{ latitude: 33.571366, longitude: -122.4324 }} style={{ width: 150, height: 150, backgroundColor: 'red' }}
          onDragEnd={(e) => { Alert.alert(JSON.stringify(e.nativeEvent.coordinate)) }} title='testmarker' description='THis is desp'>
        </Marker></MapView>

      <View style={styles.view6}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 7 }}>
          <Text style={{ fontSize: 12, fontWeight: '500', textDecorationLine: 'underline' }}>
            arrêt
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 10, fontWeight: '400' }}>
              2023-03-03
            </Text>
            <Text style={{ fontSize: 10, fontWeight: '400', color: '#18567F' }}>
              | 02:13:15
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 7 }}>
          <Text style={{ fontSize: 12, fontWeight: '500', textDecorationLine: 'underline' }}>
            démarrer
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 10, fontWeight: '400' }}>
              2023-03-03
            </Text>
            <Text style={{ fontSize: 10, fontWeight: '400', color: '#18567F' }}>
              | 02:13:15
            </Text>
          </View>

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 9 }}>
          <Text style={{ fontSize: 9, fontWeight: '500', color: '#18567F' }}>
            Show complete address
          </Text>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="arrow-right" size={10} color="#18567F" style={{ alignSelf: 'center', paddingTop: 3 }} />
          </IconComponentProvider>
        </View>
      </View>

      <>
        <Image source={require('../../assets/path2.png')} style={{ position: 'absolute', top: 300, left: 50 }} />
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
          <Icon name="map-marker" size={30} color="#18567F" style={{ position: 'absolute', top: 385, left: 35 }} />

          <Icon name="map-marker" size={30} color="#18567F" style={{ position: 'absolute', top: 285, left: 165 }} />
          <View style={{
            width: 15, height: 15, backgroundColor: '#E18700', borderRadius: 18, justifyContent: 'center'
            , alignItems: 'center', position: 'absolute', top: 289, left: 172
          }}><Text style={{ color: 'white', fontSize: 11, fontWeight: '600' }}>P
            </Text></View>
          <Icon name="map-marker" size={30} color="#18567F" style={{ position: 'absolute', top: 365, left: 285 }} />
        </IconComponentProvider>
        <View style={{
          width: 15, height: 15, backgroundColor: '#00A911', borderRadius: 18, justifyContent: 'center'
          , alignItems: 'center', position: 'absolute', top: 390, left: 42
        }}><Text style={{ color: 'white', fontSize: 11, fontWeight: '600' }}>S</Text></View>
        <View style={{
          width: 15, height: 15, backgroundColor: '#D61414', borderRadius: 18, justifyContent: 'center'
          , alignItems: 'center', position: 'absolute', top: 370, left: 292
        }}><Text style={{ color: 'white', fontSize: 11, fontWeight: '600' }}>
            E</Text>
        </View>
        <Image source={require('../../assets/car.png')} style={{ position: 'absolute', top: 365, left: 85, width: 58.17, height: 29.45, transform: [{ rotate: '-20deg' }] }} />
      </>

      <View style={styles.view2}>
        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly', alignItems: 'center' }}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="play-circle-outline" size={20} color="#18567F" style={{}} />
          </IconComponentProvider>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={0.5}
            style={{ color: '#18567F', width: wp('70%'), }} />
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="fast-forward" size={20} color="#000000" />
          </IconComponentProvider>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: wp('70%'), alignSelf: 'center' }}>
          <Text style={{ fontSize: 11, fontWeight: '400', alignSelf: 'center' }}>2023-03-03</Text>
          <Text style={{ fontSize: 11, fontWeight: '400', alignSelf: 'center' }}>00:00:00 </Text>
          <Text style={{ fontSize: 11, fontWeight: '400', alignSelf: 'center' }}> - </Text>
          <Text style={{ fontSize: 11, fontWeight: '400', alignSelf: 'center' }}> 2023-03-08</Text>
          <Text style={{ fontSize: 11, fontWeight: '400', alignSelf: 'center' }}>20:48:21</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: hp('2%') }}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignSelf: 'center', width: wp('75%') }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../../assets/clock.png')} style={{ width: 15, height: 15 }} />
                <Text style={{ fontSize: 11, fontWeight: '600', marginLeft: 5 }}>00:05:34</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../../assets/meter1.png')} style={{ width: 15, height: 15 }} />
                <Text style={{ fontSize: 11, fontWeight: '600', marginLeft: 5 }}>0Km/h</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../../assets/meter1.png')} style={{ width: 15, height: 15 }} />
                <Text style={{ fontSize: 11, fontWeight: '600', marginLeft: 5 }}>167.08Km</Text>
              </View>
            </View>
          </IconComponentProvider>
        </View>
        <Text style={{ fontSize: 9, fontWeight: '400', marginTop: hp('0.5%'), marginLeft: wp('18%'), marginBottom: hp('2.5%') }}>2023-03-03</Text>
      </View>

    </SafeAreaView >
  )
}

export default Historiquie2;
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
    marginTop: hp('5%')
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
  view1: {
    width: 38, height: 38, borderRadius: 30,
    backgroundColor: '#18567F', justifyContent: 'center', alignItems: 'center', position: 'absolute',
  },
  view2: {
    position: 'absolute',
    width: wp('94%'),
    alignSelf: 'center',
    // height: 160,
    backgroundColor: 'white',
    borderRadius: 10,

    bottom: hp('7%')
  },
  view3: { flexDirection: 'row', marginHorizontal: 40, marginTop: 20 },
  view4: {
    position: 'absolute',
    width: 342,
    height: 55,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    top: 80,
    left: 10,
    flexDirection: 'row'
  },
  view5: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    borderWidth: 0.7,
    borderRadius: 20
  },
  view6: {
    position: 'absolute',
    backgroundColor: '#ffff',
    width: wp('60%'),
    borderRadius: 10,
    left: wp('4%'),
    top: hp('27%'),
    paddingBottom: 5,
    paddingTop: 8,
    zIndex: 99,
    paddingRight: 10
  },
});