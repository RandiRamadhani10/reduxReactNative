import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import getLogin from '../../data/redux/screens/login/action';
const screen = Dimensions.get('screen');
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const logins = useSelector(state => state.login);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const runLogin = () => {
    const data = {email: email, password: password};
    dispatch(getLogin(data));
  };
  const validateLogin = () => {
    logins.isLogin
      ? navigation.navigate('Home')
      : Alert.alert('Password dan Email salah');
  };
  useEffect(() => {
    validateLogin();
  }, [logins]);
  return (
    <View style={styles.parent}>
      <Image
        style={styles.img}
        source={require('../../assets/logoGedebook.png')}
      />
      <Text style={styles.text}>LOGIN</Text>
      <KeyboardAvoidingView
        style={{width: screen.width * 0.8, alignItems: 'center'}}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          keyboardType="default"
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            runLogin();
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Text style={{marginTop: 30}}>Dont have account ?</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  parent: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  img: {width: screen.width * 0.7, height: screen.width * 0.7},
  text: {fontSize: 20, color: 'black', fontWeight: 'bold'},
  input: {
    width: '100%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btn: {
    padding: 10,
    margin: 5,
    borderRadius: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    width: screen.width * 0.3,
  },
});
export default Login;
