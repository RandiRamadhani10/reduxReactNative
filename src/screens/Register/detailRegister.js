import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const screen = Dimensions.get('screen');
const Detailregister = ({navigation}) => {
  return (
    <View style={styles.parent}>
      <Text style={{fontSize: 25, marginBottom: 30}}>
        Registration Complete
      </Text>
      <Icon name="checkmark-circle-sharp" size={100} color="#198754" />
      <Text style={{fontSize: 15, marginTop: 30}}>
        We sent verification to your email
      </Text>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: 'black',
          borderRadius: 50,
          paddingHorizontal: 30,
          marginTop: 30,
        }}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={{color: 'white', fontSize: 15}}>Back to login</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Detailregister;
