import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home/home';
import Login from './screens/Login/login';
import Register from './screens/Register/register';
import Detailbook from './screens/DetailBook/detailBook';
import Detailregister from './screens/Register/detailRegister';
import Splash from './screens/Splash/splash';
const Stack = createNativeStackNavigator();
const Index = () => {
  return (
    <>
      <NavigationContainer>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#131313',
            justifyContent: 'center',
          }}>
          <StatusBar
            animated={true}
            barStyle="dark-content"
            backgroundColor="transparent"
            showHideTransition={'fade'}
            translucent={true}
          />
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Splash">
            <Stack.Screen name="DetailRegister" component={Detailregister} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="DetailBook" component={Detailbook} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
};

export default Index;
