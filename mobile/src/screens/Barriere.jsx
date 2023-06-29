import React, { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, Image, View, StatusBar, StyleSheet, Slider } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


function Barriere({ navigation }) {
  const [show3, setShow3] = useState(false)
  const [show4, setShow4] = useState(false)
  const [val, setVal] = useState(0.3)

  const onValueChange = (newValue) => {
    setVal(newValue);
  };

  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <MapView
        initialRegion={{
          latitude: 30.733315,
          longitude: 76.779419,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        style={{ width: wp('97%'), height: hp('81%'), borderRadius: 10, alignSelf: 'center' }}>
        <Marker draggable coordinate={{ latitude: 33.571366, longitude: -122.4324 }}
          style={{ width: 150, height: 150, backgroundColor: 'red' }}
          onDragEnd={(e) => { Alert.alert(JSON.stringify(e.nativeEvent.coordinate)) }} title='testmarker' description='THis is desp'>
        </Marker></MapView>
      <Image source={require('../../assets/map_design.png')} style={{ position: 'absolute', top: 200, width: 320, height: 146, marginHorizontal: 20 }} />
      <View style={[styles.view1, { top: 210, left: 60 }]}>
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
          <Icon name="map-marker" size={15} color="#FFFF" />
        </IconComponentProvider>
      </View>

      <View style={styles.view4}>
        <TouchableOpacity
          style={[styles.view5, {}]}
          onPress={() => {
            {
              if (val <= 0) { setVal(0) } else { setVal(val - 0.1) }
            }
          }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>-</Text>
        </TouchableOpacity>
        <Text style={{}}>100m</Text>
        <Slider
          styleAttr="Horizontal"
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          value={val}
          onValueChange={onValueChange}
          thumbTintColor="#18567F"
          minimumTrackTintColor="#18567F"
          style={{ color: '#18567F', width: 144, }} />
        <Text style={{}}>5000m</Text>
        <TouchableOpacity
          style={[styles.view5,]}
          onPress={() => {
            if (val >= 1) { setVal(1) } else { setVal(val + 0.1) }
          }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>+</Text>
        </TouchableOpacity>
      </View>



      <TouchableOpacity style={styles.syncButton}>
        <Image source={require('../../assets/sync.png')} />
      </TouchableOpacity>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <Text style={{ fontSize: 13, fontWeight: '500' }}>Fence name</Text>
          <Text style={{ fontSize: 13, fontWeight: '400' }}>Lorem Ipsem text</Text>
        </View>
        <View style={[styles.view3, { marginTop: hp('3%') }]}>
          <Text style={{ fontSize: 11, fontWeight: '600', color: '#18567F' }}>Param...l’alerte</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.checkBox}
              onPress={() => { setShow3(!show3) }}>
              {show3 ? (<IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name="check" size={20} color="#5D5C59" />
              </IconComponentProvider>) : null}
            </TouchableOpacity>
            <Text style={{ fontSize: 10, fontWeight: '500', marginLeft: 10 }}>Enter</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.checkBox}
              onPress={() => { setShow4(!show4) }}>
              {show4 ? (<IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name="check" size={20} color="#5D5C59" />
              </IconComponentProvider>) : null}
            </TouchableOpacity>
            <Text style={{ fontSize: 10, fontWeight: '500', marginLeft: 10 }}>Sortie</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => { navigation.navigate('Historiquie2') }}
          style={styles.bigButton}>
          <Text style={{ color: '#FFFF', fontSize: 14, fontWeight: '500' }}>Sauvegarder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Barriere
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
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#18567F',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  view2: {
    width: wp('93%'),
    position: 'absolute',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    top: hp('67%')
  },
  view3: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: hp('2.5%'),
  },
  view4: {
    position: 'absolute',
    width: wp('85%'),
    height: hp('7%'),
    backgroundColor: '#FFFF',
    borderRadius: 10,
    top: hp('14%'),
    flexDirection: 'row',
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  view5: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    borderWidth: 0.7,
    borderRadius: 20
  },
  syncButton: {
    position: 'absolute',
    top: hp('60%'),
    left: wp('6%'),
    width: 35,
    height: 35,
    backgroundColor: '#FFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  checkBox: {
    width: wp('5%'),
    height: wp('5%'),
    borderWidth: 0.3,
    alignItems: 'center',
    borderRadius: 2
  },
  bigButton: {
    width: 300,
    height: 50,
    backgroundColor: '#18567F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: hp('2.5%'),
    marginHorizontal: 20,
    marginVertical: hp('2.5%'),

  }
})