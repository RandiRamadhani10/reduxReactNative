import React, {useEffect} from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
const Splash = ({navigation}) => {
  const screen = Dimensions.get('screen');
  const logins = useSelector(state => state.login);
  useEffect(() => {
    setTimeout(() => {
      logins.isLoading
        ? navigation.replace('Home')
        : navigation.replace('Login');
    }, 2000);
  }, [navigation]);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{width: screen.width, height: screen.height * 0.2}}></View>
      <View
        style={{
          width: screen.width,
          height: screen.height * 0.6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/logoGedebook.png')}
          style={{width: screen.width * 0.3, height: screen.width * 0.3}}
        />
        <Text style={{color: 'black', fontSize: 18}}>Gedebook</Text>
      </View>
      <View
        style={{
          width: screen.width,
          height: screen.height * 0.2,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 15, margin: 15}}>
          Randi Ramadhani
        </Text>
      </View>
    </View>
  );
};

export default Splash;
