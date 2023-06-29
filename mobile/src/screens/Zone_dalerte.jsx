import React, { useState } from 'react'
import {
  SafeAreaView, Text, View, Image,
  TouchableOpacity, StatusBar, StyleSheet
} from 'react-native'
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
function Zone_dalerte({ navigation }) {
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const [show4, setShow4] = useState(false)
  return (
    <SafeAreaView style={{ paddingTop: 20, backgroundColor: '#F9F9F9', flex: 1 }}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles.alertBlock}>
        <View style={{
          backgroundColor: '#FFFF', paddingBottom: 12,
          borderTopLeftRadius: 10, borderTopRightRadius: 10, elevation: 0.5
        }}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', width: wp('75%'), marginTop: 8, alignItems: 'center', alignSelf: 'center' }} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                backgroundColor: '#18567F', alignItems: 'center',
                justifyContent: 'center', width: 35, height: 35, borderRadius: 40,
              }}>
                <Image source={require('../../assets/hash.png')} style={{ width: 15, height: 15 }} />
              </View>
              <Text style={styles.t2}>abeille</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/meter.png')} style={{
                width: 21, height: 21,
              }} />
              <Text style={{ fontSize: 10, fontWeight: '700', color: '#18567F', marginLeft: 5 }}>200</Text>
            </View>
          </View>

          <Text style={{ fontSize: 12, fontWeight: '400', marginLeft: 20, marginTop: 10 }}>Lorem ipsum dolor sit amet consecte</Text>
        </View>
        <View style={{ backgroundColor: "#18567F1F", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 1, borderTopWidth: 0, borderColor: "#18567F40" }}>
          <View style={{ width: wp('80%'), alignSelf: 'center', height: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#18567F' }}>Param...l’alerte</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{
                width: 20, height: 20, borderWidth: 1, borderRadius: 2, flexDirection: 'row',
                alignItems: 'center', borderColor: 'rgba(0, 0, 0, 0.28)', marginBottom: 10
              }} onPress={() => { setShow1(!show1) }}>
                {show1 ? (<IconComponentProvider IconComponent={MaterialCommunityIcons} >
                  <Icon name="check" size={20} color="#5D5C59" style={{ alignSelf: 'center', marginTop: -2 }} />
                </IconComponentProvider>) : null}
              </TouchableOpacity>
              <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 10 }}>Enter</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{
                width: 20, height: 20, borderWidth: 1, borderRadius: 2,
                alignItems: 'center', borderColor: 'rgba(0, 0, 0, 0.28)'
              }} onPress={() => { setShow2(!show2) }}>
                {show2 ? (<IconComponentProvider IconComponent={MaterialCommunityIcons}>
                  <Icon name="check" size={20} color="#5D5C59" style={{ alignSelf: 'center', marginTop: -2 }} />
                </IconComponentProvider>) : null}
              </TouchableOpacity>
              <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 10 }}>Sortie</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.alertBlock}>
        <View style={{
          backgroundColor: '#FFFF', paddingBottom: 12,
          borderTopLeftRadius: 10, borderTopRightRadius: 10, elevation: 0.5
        }}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', width: wp('75%'), marginTop: 8, alignItems: 'center', alignSelf: 'center' }} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                backgroundColor: '#18567F', alignItems: 'center',
                justifyContent: 'center', width: 35, height: 35, borderRadius: 40,
              }}>
                <Image source={require('../../assets/hash.png')} style={{ width: 15, height: 15 }} />
              </View>
              <Text style={styles.t2}>abeille</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/meter.png')} style={{
                width: 21, height: 21,
              }} />
              <Text style={{ fontSize: 10, fontWeight: '700', color: '#18567F', marginLeft: 5 }}>200</Text>
            </View>
          </View>

          <Text style={{ fontSize: 12, fontWeight: '400', marginLeft: 20, marginTop: 10 }}>Lorem ipsum dolor sit amet consecte</Text>
        </View>
        <View style={{ backgroundColor: "#18567F1F", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 1, borderTopWidth: 0, borderColor: "#18567F40" }}>
          <View style={{ width: wp('80%'), alignSelf: 'center', height: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#18567F' }}>Param...l’alerte</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{
                width: 20, height: 20, borderWidth: 1, borderRadius: 2, flexDirection: 'row',
                alignItems: 'center', borderColor: 'rgba(0, 0, 0, 0.28)', marginBottom: 10
              }} onPress={() => { setShow1(!show1) }}>
                {show1 ? (<IconComponentProvider IconComponent={MaterialCommunityIcons} >
                  <Icon name="check" size={20} color="#5D5C59" style={{ alignSelf: 'center', marginTop: -2 }} />
                </IconComponentProvider>) : null}
              </TouchableOpacity>
              <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 10 }}>Enter</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{
                width: 20, height: 20, borderWidth: 1, borderRadius: 2,
                alignItems: 'center', borderColor: 'rgba(0, 0, 0, 0.28)'
              }} onPress={() => { setShow2(!show2) }}>
                {show2 ? (<IconComponentProvider IconComponent={MaterialCommunityIcons}>
                  <Icon name="check" size={20} color="#5D5C59" style={{ alignSelf: 'center', marginTop: -2 }} />
                </IconComponentProvider>) : null}
              </TouchableOpacity>
              <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 10 }}>Sortie</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Zone_dalerte
const styles = StyleSheet.create({
  v1: {
    flex: 1,
    backgroundColor: 'white'
  },
  t1: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: wp('20%'),
    marginTop: hp('4%')
  },


  view1:
  {
    backgroundColor: '#18567F',
    width: 30.83, height: 30.83,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 70
  },
  t2: {
    fontSize: 14,
    fontWeight: '600',
    color: '#18567F',
    marginLeft: 5
  },
  alertBlock: {
    backgroundColor: '#FFF',
    marginTop: hp('1%'),
    width: wp('85%'),
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1
  }
});