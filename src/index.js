import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";

import {login} from './login';
import {register} from './register';
import {about} from './about';
import {home} from './home';
import {add} from './add';
import {profil} from './profil';
import {detail} from './detail';
import {splash} from './splash';
import { Image } from "react-native";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

import { RootContext } from './context'

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator drawerContentOptions={{ 
        labelStyle: { fontFamily: 'Montserrat', fontSize:18, color: '#350B49' },
        activeBackgroundColor: '#EAE3F1'  
        
    }} 
    initialRouteName="BERANDA" drawerContent={props => {
        return (
          <DrawerContentScrollView {...props} >
            <DrawerItemList {...props} />
            <DrawerItem label="KELUAR" 
            labelStyle={{ fontFamily: 'Montserrat', fontSize:18, color: '#350B49' }}
            onPress={() => props.navigation.replace("Login")} 
            />
          </DrawerContentScrollView>
        )
      }}
    >
    <Drawer.Screen name="BERANDA" component={TabsScreen} />
    <Drawer.Screen name="TENTANG" component={about} />
  </Drawer.Navigator>
);

const DetailStack = () => (
  <RootStack.Navigator screenOptions={{headerShown: false}}>
    <RootStack.Screen name="Home" component={DrawerScreen} />
    <RootStack.Screen name="Detail" component={detail} />
  </RootStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
    <Tabs.Navigator 
    tabBarOptions={{ 
        labelStyle: { fontSize: 15, fontFamily: 'Montserrat', color: '#350B49' }, 
        activeBackgroundColor: '#EAE3F1',
        }}
    >
      <Tabs.Screen name="LIST" component={home} options={{ tabBarIcon: () => ( <Image source={require('./images/home.png')} style={{width: 30, height: 30}} /> ) }} />
      <Tabs.Screen name="PROFIL" component={profil} options={{ tabBarIcon: () => ( <Image source={require('./images/profil.png')} style={{width: 30, height: 30}} /> ) }} />
      <Tabs.Screen name="TAMBAH" component={add} options={{ tabBarIcon: () => ( <Image source={require('./images/add.png')} style={{width: 30, height: 30}} /> ) }} />
    </Tabs.Navigator>
  );

const RootStack = createStackNavigator();

export default () => {

    const [user, setUser] = useState('')
    handleUser = (value) => {
        setUser (value)
    }

    if( user != ''){
        
    }

    return (
        <RootContext.Provider value={{ user, handleUser }}>
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                <RootStack.Screen
                name="Splash"
                component={splash}
                />
                
                <RootStack.Screen
                name="Login"
                component={login}
                />
                <RootStack.Screen
                name="Register"
                component={register}
                />
                <RootStack.Screen
                name="Home"
                component={DetailStack}
                />
            </RootStack.Navigator>
        </NavigationContainer>
        </RootContext.Provider>
    )
}